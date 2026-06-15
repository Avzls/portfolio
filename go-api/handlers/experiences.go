package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"porto-api/database"
	"porto-api/models"

	"github.com/go-chi/chi/v5"
)

type ExperiencesHandler struct{}

func (h *ExperiencesHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT id, title, company, period, sort_order FROM experiences ORDER BY sort_order")
	if err != nil {
		http.Error(w, `{"error":"failed to fetch"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var items []models.Experience
	for rows.Next() {
		var e models.Experience
		rows.Scan(&e.ID, &e.Title, &e.Company, &e.Period, &e.SortOrder)
		items = append(items, e)
	}
	if items == nil {
		items = []models.Experience{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func (h *ExperiencesHandler) Create(w http.ResponseWriter, r *http.Request) {
	var e models.Experience
	if err := json.NewDecoder(r.Body).Decode(&e); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec("INSERT INTO experiences (title, company, period, sort_order) VALUES (?, ?, ?, ?)",
		e.Title, e.Company, e.Period, e.SortOrder)
	if err != nil {
		http.Error(w, `{"error":"failed to create"}`, http.StatusInternalServerError)
		return
	}

	id, _ := result.LastInsertId()
	e.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(e)
}

func (h *ExperiencesHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	var e models.Experience
	if err := json.NewDecoder(r.Body).Decode(&e); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec("UPDATE experiences SET title=?, company=?, period=?, sort_order=? WHERE id=?",
		e.Title, e.Company, e.Period, e.SortOrder, id)
	if err != nil {
		http.Error(w, `{"error":"failed to update"}`, http.StatusInternalServerError)
		return
	}

	e.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(e)
}

func (h *ExperiencesHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	_, err := database.DB.Exec("DELETE FROM experiences WHERE id=?", id)
	if err != nil {
		http.Error(w, `{"error":"failed to delete"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "deleted"})
}
