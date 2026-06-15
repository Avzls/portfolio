package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"porto-api/database"
	"porto-api/models"

	"github.com/go-chi/chi/v5"
)

type SocialLinksHandler struct{}

func (h *SocialLinksHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT id, platform, url, icon_class, sort_order FROM social_links ORDER BY sort_order")
	if err != nil {
		http.Error(w, `{"error":"failed to fetch"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var items []models.SocialLink
	for rows.Next() {
		var s models.SocialLink
		rows.Scan(&s.ID, &s.Platform, &s.URL, &s.IconClass, &s.SortOrder)
		items = append(items, s)
	}
	if items == nil {
		items = []models.SocialLink{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func (h *SocialLinksHandler) Create(w http.ResponseWriter, r *http.Request) {
	var s models.SocialLink
	if err := json.NewDecoder(r.Body).Decode(&s); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec("INSERT INTO social_links (platform, url, icon_class, sort_order) VALUES (?, ?, ?, ?)",
		s.Platform, s.URL, s.IconClass, s.SortOrder)
	if err != nil {
		http.Error(w, `{"error":"failed to create"}`, http.StatusInternalServerError)
		return
	}

	id, _ := result.LastInsertId()
	s.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(s)
}

func (h *SocialLinksHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	var s models.SocialLink
	if err := json.NewDecoder(r.Body).Decode(&s); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec("UPDATE social_links SET platform=?, url=?, icon_class=?, sort_order=? WHERE id=?",
		s.Platform, s.URL, s.IconClass, s.SortOrder, id)
	if err != nil {
		http.Error(w, `{"error":"failed to update"}`, http.StatusInternalServerError)
		return
	}

	s.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(s)
}

func (h *SocialLinksHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	_, err := database.DB.Exec("DELETE FROM social_links WHERE id=?", id)
	if err != nil {
		http.Error(w, `{"error":"failed to delete"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "deleted"})
}
