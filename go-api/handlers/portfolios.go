package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"porto-api/database"
	"porto-api/models"

	"github.com/go-chi/chi/v5"
)

type PortfoliosHandler struct{}

func (h *PortfoliosHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT id, title, project_type, client, duration, framework, image_url, preview_url, video_url, sort_order FROM portfolios ORDER BY sort_order")
	if err != nil {
		http.Error(w, `{"error":"failed to fetch"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var items []models.Portfolio
	for rows.Next() {
		var p models.Portfolio
		rows.Scan(&p.ID, &p.Title, &p.ProjectType, &p.Client, &p.Duration, &p.Framework, &p.ImageURL, &p.PreviewURL, &p.VideoURL, &p.SortOrder)
		items = append(items, p)
	}
	if items == nil {
		items = []models.Portfolio{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func (h *PortfoliosHandler) Create(w http.ResponseWriter, r *http.Request) {
	var p models.Portfolio
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(`INSERT INTO portfolios (title, project_type, client, duration, framework, image_url, preview_url, video_url, sort_order) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		p.Title, p.ProjectType, p.Client, p.Duration, p.Framework, p.ImageURL, p.PreviewURL, p.VideoURL, p.SortOrder)
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

func (h *PortfoliosHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	var p models.Portfolio
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(`UPDATE portfolios SET title=?, project_type=?, client=?, duration=?, framework=?, image_url=?, preview_url=?, video_url=?, sort_order=? WHERE id=?`,
		p.Title, p.ProjectType, p.Client, p.Duration, p.Framework, p.ImageURL, p.PreviewURL, p.VideoURL, p.SortOrder, id)
	if err != nil {
		http.Error(w, `{"error":"failed to update"}`, http.StatusInternalServerError)
		return
	}

	p.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

func (h *PortfoliosHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	_, err := database.DB.Exec("DELETE FROM portfolios WHERE id=?", id)
	if err != nil {
		http.Error(w, `{"error":"failed to delete"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "deleted"})
}
