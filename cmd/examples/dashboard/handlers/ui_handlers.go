package handlers

import (
	"bytes"
	"html/template"
	"net/http"
	"time"

	"github.com/primadi/lokstra"
)

var rootProject = "../../../"

// Dashboard represents the main dashboard data
type Dashboard struct {
	Title      string
	Subtitle   string
	User       User
	Stats      []Stat
	Activities []Activity
	Breadcrumb []BreadcrumbItem
}

// User represents user information
type User struct {
	Name   string `json:"name"`
	Role   string `json:"role"`
	Avatar string `json:"avatar,omitempty"`
}

// Stat represents dashboard statistics
type Stat struct {
	Title  string
	Value  string
	Change string
	Icon   string
	Type   string // positive, negative, neutral
}

// Activity represents recent activity items
type Activity struct {
	Title       string
	Description string
	Time        time.Time
	Type        string
	Icon        string
}

// BreadcrumbItem represents breadcrumb navigation
type BreadcrumbItem struct {
	Title  string `json:"title"`
	URL    string `json:"url,omitempty"`
	Active bool   `json:"active,omitempty"`
}

var dashboardTemplate *template.Template

func init() {
	var err error
	dashboardTemplate, err = template.ParseFiles(rootProject + "templates/layouts/dashboard.html")
	if err != nil {
		panic("Failed to parse dashboard template: " + err.Error())
	}

}

func DashboardHandler(ctx *lokstra.Context) error {
	data := Dashboard{
		Title:    "Lokstra Dashboard",
		Subtitle: "Welcome to Lokstra Admin Dashboard - Modern Web Components Framework",
		User: User{
			Name: "Administrator",
			Role: "System Admin",
		},
		Stats: []Stat{
			{
				Title:  "Active Users",
				Value:  "3,247",
				Change: "+18% from last month",
				Icon:   "users",
				Type:   "positive",
			},
			{
				Title:  "Total Revenue",
				Value:  "$89,320",
				Change: "+12% from last month",
				Icon:   "dollar-sign",
				Type:   "positive",
			},
			{
				Title:  "System Load",
				Value:  "67%",
				Change: "-5% from last week",
				Icon:   "cpu",
				Type:   "negative",
			},
			{
				Title:  "Response Time",
				Value:  "234ms",
				Change: "Optimal performance",
				Icon:   "zap",
				Type:   "neutral",
			},
		},
		Activities: []Activity{
			{
				Title:       "New user registration",
				Description: "user@example.com joined the platform",
				Time:        time.Now().Add(-10 * time.Minute),
				Type:        "user",
				Icon:        "user-plus",
			},
			{
				Title:       "System backup completed",
				Description: "Daily backup finished successfully",
				Time:        time.Now().Add(-1 * time.Hour),
				Type:        "system",
				Icon:        "server",
			},
		},
		Breadcrumb: []BreadcrumbItem{
			{Title: "Home", URL: "/"},
			{Title: "Dashboard", URL: "/dashboard", Active: true},
		},
	}

	var buf bytes.Buffer
	err := dashboardTemplate.Execute(&buf, data)
	if err != nil {
		return err
	}
	return ctx.HTML(buf.String())
}

func DashboardHandlerx(w http.ResponseWriter, r *http.Request) {
	data := Dashboard{
		Title:    "Lokstra Dashboard",
		Subtitle: "Welcome to Lokstra Admin Dashboard - Modern Web Components Framework",
		User: User{
			Name: "Administrator",
			Role: "System Admin",
		},
		Stats: []Stat{
			{
				Title:  "Active Users",
				Value:  "3,247",
				Change: "+18% from last month",
				Icon:   "users",
				Type:   "positive",
			},
			{
				Title:  "Total Revenue",
				Value:  "$89,320",
				Change: "+12% from last month",
				Icon:   "dollar-sign",
				Type:   "positive",
			},
			{
				Title:  "System Load",
				Value:  "67%",
				Change: "-5% from last week",
				Icon:   "cpu",
				Type:   "negative",
			},
			{
				Title:  "Response Time",
				Value:  "234ms",
				Change: "Optimal performance",
				Icon:   "zap",
				Type:   "neutral",
			},
		},
		Activities: []Activity{
			{
				Title:       "New user registration",
				Description: "user@example.com joined the platform",
				Time:        time.Now().Add(-10 * time.Minute),
				Type:        "user",
				Icon:        "user-plus",
			},
			{
				Title:       "System backup completed",
				Description: "Daily backup finished successfully",
				Time:        time.Now().Add(-1 * time.Hour),
				Type:        "system",
				Icon:        "server",
			},
		},
		Breadcrumb: []BreadcrumbItem{
			{Title: "Home", URL: "/"},
			{Title: "Dashboard", URL: "/dashboard", Active: true},
		},
	}

	w.Header().Set("Content-Type", "text/html")
	dashboardTemplate.Execute(w, data)
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	// Check if this is an HTMX request (partial content)
	if r.Header.Get("HX-Request") == "true" {
		// Return just the page content without the full layout
		tmpl, err := template.ParseFiles("templates/pages/users.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "text/html")
		tmpl.Execute(w, nil)
		return
	}

	// Full page request - redirect to dashboard with users content
	http.Redirect(w, r, "/#users", http.StatusSeeOther)
}

func AnalyticsHandler(w http.ResponseWriter, r *http.Request) {
	html := `
	<div class="page-header">
		<h1 class="page-title">Analytics</h1>
		<p class="page-subtitle">Track your performance metrics and insights.</p>
	</div>
	
	<div class="content-card">
		<div class="card-header">
			<h2 class="card-title">Analytics Dashboard</h2>
		</div>
		<div style="text-align: center; padding: 3rem; color: var(--ls-gray-600);">
			<i data-lucide="bar-chart" style="width: 3rem; height: 3rem; margin-bottom: 1rem;"></i>
			<h3 style="margin-bottom: 0.5rem;">Analytics Coming Soon</h3>
			<p>Detailed analytics and reporting features will be available here.</p>
		</div>
	</div>`

	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(html))
}

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
	html := `
	<div class="page-header">
		<h1 class="page-title">Projects</h1>
		<p class="page-subtitle">Manage your projects and collaborations.</p>
		
		<div class="page-actions">
			<ls-button text="New Project" variant="primary"></ls-button>
			<ls-button text="Import Project" variant="outline"></ls-button>
		</div>
	</div>
	
	<div class="stats-grid" style="margin-bottom: 2rem;">
		<div class="stat-card">
			<div class="stat-header">
				<span class="stat-title">Active Projects</span>
				<div class="stat-icon">
					<i data-lucide="folder" style="width: 1.25rem; height: 1.25rem;"></i>
				</div>
			</div>
			<div class="stat-value">12</div>
		</div>
		
		<div class="stat-card">
			<div class="stat-header">
				<span class="stat-title">Completed</span>
				<div class="stat-icon">
					<i data-lucide="check-circle" style="width: 1.25rem; height: 1.25rem;"></i>
				</div>
			</div>
			<div class="stat-value">48</div>
		</div>
		
		<div class="stat-card">
			<div class="stat-header">
				<span class="stat-title">In Progress</span>
				<div class="stat-icon">
					<i data-lucide="clock" style="width: 1.25rem; height: 1.25rem;"></i>
				</div>
			</div>
			<div class="stat-value">8</div>
		</div>
	</div>
	
	<div class="content-card">
		<div class="card-header">
			<h2 class="card-title">Recent Projects</h2>
		</div>
		<div style="text-align: center; padding: 2rem; color: var(--ls-gray-600);">
			<i data-lucide="folder-plus" style="width: 2rem; height: 2rem; margin-bottom: 1rem;"></i>
			<p>Project management features coming soon.</p>
		</div>
	</div>`

	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(html))
}

func SettingsHandler(w http.ResponseWriter, r *http.Request) {
	html := `
	<div class="page-header">
		<h1 class="page-title">Settings</h1>
		<p class="page-subtitle">Configure your application preferences.</p>
	</div>
	
	<div class="content-grid">
		<div class="content-card">
			<div class="card-header">
				<h2 class="card-title">General Settings</h2>
			</div>
			<div style="display: flex; flex-direction: column; gap: 1rem;">
				<div>
					<label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--ls-gray-700);">Application Name</label>
					<ls-input value="Lokstra Admin" placeholder="Enter application name"></ls-input>
				</div>
				<div>
					<label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--ls-gray-700);">Theme</label>
					<select style="width: 100%; padding: 0.5rem; border: 1px solid var(--ls-gray-300); border-radius: var(--ls-border-radius); background: white;" onchange="setTheme(this.value)">
						<option value="">Light Theme</option>
						<option value="theme-dark">Dark Theme</option>
					</select>
				</div>
				<div style="margin-top: 1rem;">
					<ls-button text="Save Settings" variant="primary"></ls-button>
				</div>
			</div>
		</div>
		
		<div class="content-card">
			<div class="card-header">
				<h2 class="card-title">Account Settings</h2>
			</div>
			<div style="display: flex; flex-direction: column; gap: 1rem;">
				<div>
					<label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--ls-gray-700);">Email</label>
					<ls-input value="admin@lokstra.com" type="email"></ls-input>
				</div>
				<div>
					<label style="display: block; font-weight: 500; margin-bottom: 0.5rem; color: var(--ls-gray-700);">Password</label>
					<ls-input type="password" placeholder="Enter new password"></ls-input>
				</div>
				<div style="margin-top: 1rem;">
					<ls-button text="Update Account" variant="primary"></ls-button>
				</div>
			</div>
		</div>
	</div>`

	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(html))
}
