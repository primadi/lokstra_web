package web_render

import (
	"fmt"

	"github.com/primadi/lokstra/core/request"
)

type PageContent struct {
	HTML        string            // Main content HTML
	Title       string            // Page title (for browser tab and meta)
	Description string            // Page description (for meta tags)
	MetaTags    map[string]string // Page-specific meta tags
	CurrentPage string            // Current page identifier (for sidebar active state)
	SidebarData any               // Custom sidebar data if needed
}

// PageContentFunc is a function that returns complete page content
type PageContentFunc func(*request.Context) (*PageContent, error)

// RenderFullPage renders a complete HTML page with layout
func RenderFullPage(pageContent *PageContent,
	renderTemplate func(*PageContent) (string, error)) string {
	result, err := renderTemplate(pageContent)
	if err != nil {
		fmt.Printf("Template execution error: %v\n", err)
		return fmt.Sprintf("<html><body><h1>Template Execution Error</h1><p>%v</p></body></html>", err)
	}
	return result
}

// RenderPartialContent renders just the content for HTMX requests
// WITH page-specific assets for consistent behavior
func RenderPartialContent(pageContent *PageContent) string {
	content := pageContent.HTML

	return content
}

// PageHandler creates a handler with consistent behavior for both full page and HTMX requests
func PageHandler(contentFunc PageContentFunc, renderTemplate func(*PageContent) (string, error)) func(*request.Context) error {
	return func(c *request.Context) error {
		pageContent, err := contentFunc(c)
		if err != nil {
			return err
		}
		isHTMXRequest := c.GetHeader("HX-Request") == "true"
		if isHTMXRequest {
			html := RenderPartialContent(pageContent)
			return c.HTML(html)
		}
		fullPageHTML := RenderFullPage(pageContent, renderTemplate)
		return c.HTML(fullPageHTML)
	}
}
