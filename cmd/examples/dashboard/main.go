package main

import (
	"html/template"
	"log"
	"net/http"
	"time"
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

func main() {
	// Serve static files (components, assets)
	http.Handle("/components/", http.StripPrefix("/components/", http.FileServer(
		http.Dir(rootProject+"components"))))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(
		http.Dir(rootProject+"static"))))

	// Routes
	http.HandleFunc("/", dashboardHandler)
	http.HandleFunc("/users", usersHandler)
	http.HandleFunc("/api/users", apiUsersHandler)
	http.HandleFunc("/api/activity", apiActivityHandler)

	// Additional partial routes for HTMX
	http.HandleFunc("/analytics", analyticsHandler)
	http.HandleFunc("/projects", projectsHandler)
	http.HandleFunc("/settings", settingsHandler)

	log.Println("Server starting on http://localhost:8082")
	log.Fatal(http.ListenAndServe(":8082", nil))
}

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles(rootProject + "templates/layouts/dashboard.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

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
	tmpl.Execute(w, data)
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
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

func apiUsersHandler(w http.ResponseWriter, r *http.Request) {
	// Simulate some delay to show loading state
	time.Sleep(500 * time.Millisecond)

	// Return the users table partial
	tmpl, err := template.ParseFiles(rootProject + "templates/partials/users-table.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, nil)
}

func apiActivityHandler(w http.ResponseWriter, r *http.Request) {
	// Simulate loading delay
	time.Sleep(800 * time.Millisecond)

	activities := []Activity{
		{
			Title:       "New user registered",
			Description: "john.doe@example.com joined the platform",
			Time:        time.Now().Add(-5 * time.Minute),
			Type:        "user",
			Icon:        "user-plus",
		},
		{
			Title:       "Report generated",
			Description: "Monthly analytics report completed",
			Time:        time.Now().Add(-15 * time.Minute),
			Type:        "report",
			Icon:        "file-text",
		},
		{
			Title:       "System backup",
			Description: "Automated backup completed successfully",
			Time:        time.Now().Add(-1 * time.Hour),
			Type:        "system",
			Icon:        "database",
		},
		{
			Title:       "Payment received",
			Description: "$249.99 payment from Acme Corp",
			Time:        time.Now().Add(-2 * time.Hour),
			Type:        "payment",
			Icon:        "credit-card",
		},
	}

	// Simple HTML template for activity items
	html := `<div style="space-y: 1rem;">
{{range .}}
		<div style="display: flex; align-items: start; gap: 0.75rem; padding: 1rem; border-radius: var(--ls-border-radius); background-color: var(--ls-gray-50); border: 1px solid var(--ls-gray-200);">
			<div style="padding: 0.5rem; border-radius: 0.5rem; background-color: var(--ls-primary-100); color: var(--ls-primary-600);">
				<i data-lucide="{{.Icon}}" style="width: 1rem; height: 1rem;"></i>
			</div>
			<div style="flex: 1;">
				<h4 style="font-weight: 500; color: var(--ls-gray-900); margin-bottom: 0.25rem;">{{.Title}}</h4>
				<p style="color: var(--ls-gray-600); font-size: 0.875rem; margin-bottom: 0.5rem;">{{.Description}}</p>
				<time style="color: var(--ls-gray-500); font-size: 0.75rem;">{{.Time.Format "Jan 2, 3:04 PM"}}</time>
			</div>
		</div>
{{end}}
	</div>`

	tmpl, err := template.New("activity").Parse(html)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, activities)
}

func analyticsHandler(w http.ResponseWriter, r *http.Request) {
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

func projectsHandler(w http.ResponseWriter, r *http.Request) {
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

func settingsHandler(w http.ResponseWriter, r *http.Request) {
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
