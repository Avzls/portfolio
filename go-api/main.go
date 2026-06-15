package main

import (
	"fmt"
	"log"
	"net/http"

	"porto-api/config"
	"porto-api/database"
	"porto-api/handlers"
	"porto-api/middleware"

	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
)

func main() {
	cfg := config.Load()

	// Connect to database
	database.Connect(cfg)
	database.Migrate()
	database.Seed()

	// Init handlers
	authHandler := &handlers.AuthHandler{Config: cfg}
	profileHandler := &handlers.ProfileHandler{}
	skillsHandler := &handlers.SkillsHandler{}
	experiencesHandler := &handlers.ExperiencesHandler{}
	portfoliosHandler := &handlers.PortfoliosHandler{}
	socialLinksHandler := &handlers.SocialLinksHandler{}
	settingsHandler := &handlers.SettingsHandler{}
	factsHandler := &handlers.FactsHandler{}
	clientsHandler := &handlers.ClientsHandler{}
	blogPostsHandler := &handlers.BlogPostsHandler{}
	uploadHandler := &handlers.UploadHandler{Config: cfg}

	// Router
	r := chi.NewRouter()
	r.Use(chiMiddleware.Logger)
	r.Use(chiMiddleware.Recoverer)
	r.Use(middleware.CORS(cfg))

	// Serve uploaded files
	fileServer := http.FileServer(http.Dir(cfg.UploadDir))
	r.Handle("/uploads/*", http.StripPrefix("/uploads/", fileServer))

	// Public routes
	r.Route("/api", func(r chi.Router) {
		r.Post("/auth/login", authHandler.Login)

		r.Get("/profile", profileHandler.Get)
		r.Get("/skills", skillsHandler.List)
		r.Get("/experiences", experiencesHandler.List)
		r.Get("/portfolios", portfoliosHandler.List)
		r.Get("/social-links", socialLinksHandler.List)
		r.Get("/settings", settingsHandler.List)
		r.Get("/facts", factsHandler.List)
		r.Get("/clients", clientsHandler.List)
		r.Get("/blog-posts", blogPostsHandler.List)
		r.Get("/blog-posts/{id}", blogPostsHandler.Get)
	})

	// Admin routes (protected)
	r.Route("/api/admin", func(r chi.Router) {
		r.Use(middleware.Auth(cfg))

		r.Put("/profile", profileHandler.Update)

		r.Post("/skills", skillsHandler.Create)
		r.Put("/skills/{id}", skillsHandler.Update)
		r.Delete("/skills/{id}", skillsHandler.Delete)

		r.Post("/experiences", experiencesHandler.Create)
		r.Put("/experiences/{id}", experiencesHandler.Update)
		r.Delete("/experiences/{id}", experiencesHandler.Delete)

		r.Post("/portfolios", portfoliosHandler.Create)
		r.Put("/portfolios/{id}", portfoliosHandler.Update)
		r.Delete("/portfolios/{id}", portfoliosHandler.Delete)

		r.Post("/social-links", socialLinksHandler.Create)
		r.Put("/social-links/{id}", socialLinksHandler.Update)
		r.Delete("/social-links/{id}", socialLinksHandler.Delete)

		r.Put("/settings", settingsHandler.Update)

		r.Post("/facts", factsHandler.Create)
		r.Put("/facts/{id}", factsHandler.Update)
		r.Delete("/facts/{id}", factsHandler.Delete)

		r.Post("/clients", clientsHandler.Create)
		r.Put("/clients/{id}", clientsHandler.Update)
		r.Delete("/clients/{id}", clientsHandler.Delete)

		r.Post("/blog-posts", blogPostsHandler.Create)
		r.Put("/blog-posts/{id}", blogPostsHandler.Update)
		r.Delete("/blog-posts/{id}", blogPostsHandler.Delete)

		r.Post("/auth/change-password", authHandler.ChangePassword)

		r.Post("/upload", uploadHandler.Upload)

	})

	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("🚀 Porto API running on http://localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, r))
}
