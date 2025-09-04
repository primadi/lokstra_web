package web_render

import (
	"html/template"
	"strings"

	"github.com/primadi/lokstra/core/request"
)

// PageOptions untuk opsi rendering halaman
type PageOptions struct {
	Title       string
	CurrentPage string
	Scripts     []string
	Styles      []string
	CustomCSS   string
	MetaTags    map[string]string
	SidebarData any
}

var mainLayoutPage = "base.html"

// MainLayoutPage struct untuk menyimpan nama layout utama
type MainLayoutPage struct {
	Name   string
	Loader *TemplateLoader
}

// NewMainLayoutPage: inisialisasi layout utama
func NewMainLayoutPage(name string) *MainLayoutPage {
	// Default loader: layouts/pages di bawah working dir
	loader := NewTemplateLoader(".")
	return &MainLayoutPage{Name: name, Loader: loader}
}

// NewMainLayoutPageWithLoader: inisialisasi layout utama dengan loader custom
func NewMainLayoutPageWithLoader(name string, loader *TemplateLoader) *MainLayoutPage {
	return &MainLayoutPage{Name: name, Loader: loader}
}

// Set layout utama
func (m *MainLayoutPage) Set(name string) {
	m.Name = name
}

// Get layout utama
func (m *MainLayoutPage) Get() string {
	return m.Name
}

// RenderPage: API utama untuk render halaman dengan layout dan data
// Menggunakan TemplateLoader override/fallback
func (m *MainLayoutPage) RenderPage(
	c *request.Context,
	templateName string,
	data any,
	opts *PageOptions,
) *PageContent {
	// use loader from struct
	loader := m.Loader
	contentHTML := ""
	// When fullLayout, load all templates needed for composition
	var tmpl *template.Template
	var err error

	isHTMX := false
	if c != nil {
		isHTMX = c.GetHeader("HX-Request") == "true"
	}
	fullLayout := true
	if isHTMX {
		fullLayout = false
	}
	if opts != nil && opts.MetaTags != nil {
		if v, ok := opts.MetaTags["full_layout"]; ok && v == "false" {
			fullLayout = false
		}
	}

	if fullLayout {
		// Load layout, page, and sidebar partial/component
		layoutPath := loader.LayoutDir + "/" + m.Name
		pagePath := loader.PageDir + "/" + templateName + ".html"
		sidebarPath := loader.LayoutDir + "/sidebar.html"
		// Add more partials/components as needed
		tmpl, err = template.ParseFiles(layoutPath, pagePath, sidebarPath)
	} else {
		// Only load the page template for partial/HTMX
		pagePath := loader.PageDir + "/" + templateName + ".html"
		tmpl, err = template.ParseFiles(pagePath)
	}
	if err == nil && tmpl != nil {
		var buf strings.Builder
		if fullLayout {
			if err := tmpl.ExecuteTemplate(&buf, m.Name, data); err == nil {
				contentHTML = buf.String()
			} else {
				contentHTML = "<div>Layout execution error: " + err.Error() + "</div>"
			}
		} else {
			if err := tmpl.ExecuteTemplate(&buf, templateName+".html", data); err == nil {
				contentHTML = buf.String()
			} else {
				contentHTML = "<div>Template execution error: " + err.Error() + "</div>"
			}
		}
	} else {
		contentHTML = "<div>Template not found: " + templateName + ".html</div>"
	}

	html := contentHTML
	if fullLayout {
		// Bisa override via opts.MetaTags["main_layout"]
		layoutName := m.Name
		if opts != nil && opts.MetaTags != nil {
			if v, ok := opts.MetaTags["main_layout"]; ok && v != "" {
				layoutName = v
			}
		}
		// Render mainLayout and inject contentHTML into {{.Content}}
		layoutData := struct {
			PageContent
			Content string
		}{
			PageContent: PageContent{
				Title:       opts.Title,
				CurrentPage: opts.CurrentPage,
				MetaTags:    opts.MetaTags,
				SidebarData: opts.SidebarData,
			},
			Content: contentHTML,
		}
		layoutTmpl, err := loader.Load(layoutName)
		if err == nil && layoutTmpl != nil {
			var buf strings.Builder
			if err := layoutTmpl.ExecuteTemplate(&buf, layoutName, layoutData); err == nil {
				html = buf.String()
			} else {
				html = "<div>Layout execution error: " + err.Error() + "</div>"
			}
		} else {
			html = "<div>Layout template not found: " + layoutName + "</div>" + contentHTML
		}
	}

	// Build PageContent
	return &PageContent{
		HTML:        html,
		Title:       opts.Title,
		CurrentPage: opts.CurrentPage,
		MetaTags:    opts.MetaTags,
		SidebarData: opts.SidebarData,
	}
}
