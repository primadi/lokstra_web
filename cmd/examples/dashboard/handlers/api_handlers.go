package handlers

import (
	"html/template"
	"net/http"
	"time"
)

// responseWriterWrapper wraps http.ResponseWriter to track if headers have been written
type responseWriterWrapper struct {
	http.ResponseWriter
	written bool
}

func (w *responseWriterWrapper) WriteHeader(code int) {
	if !w.written {
		w.ResponseWriter.WriteHeader(code)
		w.written = true
	}
}

func (w *responseWriterWrapper) Write(data []byte) (int, error) {
	if !w.written {
		w.written = true
	}
	return w.ResponseWriter.Write(data)
}

func wrapResponseWriter(w http.ResponseWriter) *responseWriterWrapper {
	return &responseWriterWrapper{ResponseWriter: w}
}

func ApiUsersHandler(w http.ResponseWriter, r *http.Request) {
	// Wrap the response writer to prevent double header writes
	rw := wrapResponseWriter(w)

	// Simulate some delay to show loading state
	time.Sleep(500 * time.Millisecond)

	// Return the users table partial
	tmpl, err := template.ParseFiles(rootProject + "templates/partials/users-table.html")
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	rw.Header().Set("Content-Type", "text/html")
	tmpl.Execute(rw, nil)
}

func ApiActivityHandler(w http.ResponseWriter, r *http.Request) {
	// Wrap the response writer to prevent double header writes
	rw := wrapResponseWriter(w)

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
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	rw.Header().Set("Content-Type", "text/html")
	tmpl.Execute(rw, activities)
}
