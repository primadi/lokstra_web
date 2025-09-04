package main

import (
	"net/http"
	"time"

	"github.com/primadi/lokstra"
	"github.com/primadi/lokstra/core/request"
	"github.com/primadi/lokstra_web"
	"github.com/primadi/lokstra_web/cmd/examples/dashboard/handlers"
)

var rootProject = "../../../"

func main() {
	// 1. Setup registration context
	regCtx := lokstra.NewGlobalRegistrationContext()

	// 2. Register handlers
	registerComponents(regCtx)

	// 4. Create server
	server := lokstra.NewServer(regCtx, "dashboard-server")

	// 5. Create App
	_ = createApp(server)

	// 5. Start server and wait for 5 sec shutdown signal
	err := server.StartAndWaitForShutdown(5 * time.Second)
	lokstra.Logger.Fatalf("Error starting server: %v", err)
}

func registerComponents(regCtx lokstra.RegistrationContext) {
	// Register custom components here,
}

func createApp(server *lokstra.Server) *lokstra.App {
	app := server.NewApp("dashboard-app", ":8081")
	app.GET("/static/", request.ServeFile(rootProject+"static"))
	// app.GET("/components/", ServeFile(rootProject+"components"))
	app.GET("/components/", request.ServeFile(lokstra_web.EmbedComponents))

	// app.RawHandle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir(rootProject+"static"))))
	// app.RawHandle("/components/", http.StripPrefix("/components/", http.FileServer(http.Dir(rootProject+"components"))))

	app.GET("/", handlers.DashboardHandler)
	app.RawHandle("/users", http.HandlerFunc(handlers.UsersHandler))
	app.RawHandle("/api/users", http.HandlerFunc(handlers.ApiUsersHandler))
	app.RawHandle("/api/activity", http.HandlerFunc(handlers.ApiActivityHandler))

	// Additional partial routes for HTMX
	app.RawHandle("/analytics", http.HandlerFunc(handlers.AnalyticsHandler))
	app.RawHandle("/projects", http.HandlerFunc(handlers.ProjectsHandler))
	app.RawHandle("/settings", http.HandlerFunc(handlers.SettingsHandler))

	return app
}
