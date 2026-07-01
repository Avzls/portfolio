package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"porto-api/database"
	"porto-api/models"

	"github.com/go-chi/chi/v5"
)

type BlogPostsHandler struct{}

func (h *BlogPostsHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT id, title, category, excerpt, COALESCE(content,''), image_url, post_date, comments, sort_order FROM blog_posts ORDER BY sort_order")
	if err != nil {
		http.Error(w, `{"error":"failed to fetch"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var items []models.BlogPost
	for rows.Next() {
		var p models.BlogPost
		rows.Scan(&p.ID, &p.Title, &p.Category, &p.Excerpt, &p.Content, &p.ImageURL, &p.PostDate, &p.Comments, &p.SortOrder)
		items = append(items, p)
	}
	if items == nil {
		items = []models.BlogPost{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func (h *BlogPostsHandler) Get(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	var p models.BlogPost
	err := database.DB.QueryRow("SELECT id, title, category, excerpt, COALESCE(content,''), image_url, post_date, comments, sort_order FROM blog_posts WHERE id = ?", id).
		Scan(&p.ID, &p.Title, &p.Category, &p.Excerpt, &p.Content, &p.ImageURL, &p.PostDate, &p.Comments, &p.SortOrder)
	if err == sql.ErrNoRows {
		http.Error(w, `{"error":"post not found"}`, http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(w, `{"error":"failed to fetch"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

func (h *BlogPostsHandler) Create(w http.ResponseWriter, r *http.Request) {
	var p models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec("INSERT INTO blog_posts (title, category, excerpt, content, image_url, post_date, comments, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		p.Title, p.Category, p.Excerpt, p.Content, p.ImageURL, p.PostDate, p.Comments, p.SortOrder)
	if err != nil {
		http.Error(w, `{"error":"failed to create"}`, http.StatusInternalServerError)
		return
	}

	id, _ := result.LastInsertId()
	p.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

func (h *BlogPostsHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	var p models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec("UPDATE blog_posts SET title=?, category=?, excerpt=?, content=?, image_url=?, post_date=?, comments=?, sort_order=? WHERE id=?",
		p.Title, p.Category, p.Excerpt, p.Content, p.ImageURL, p.PostDate, p.Comments, p.SortOrder, id)
	if err != nil {
		http.Error(w, `{"error":"failed to update"}`, http.StatusInternalServerError)
		return
	}

	p.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

func (h *BlogPostsHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	if _, err := database.DB.Exec("DELETE FROM blog_posts WHERE id=?", id); err != nil {
		http.Error(w, `{"error":"failed to delete"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "deleted"})
}
