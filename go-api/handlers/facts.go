package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"porto-api/database"
	"porto-api/models"

	"github.com/go-chi/chi/v5"
)

type FactsHandler struct{}

func (h *FactsHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT id, number, label, highlight, sort_order FROM facts ORDER BY sort_order")
	if err != nil {
		http.Error(w, `{"error":"failed to fetch"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var items []models.Fact
	for rows.Next() {
		var f models.Fact
		rows.Scan(&f.ID, &f.Number, &f.Label, &f.Highlight, &f.SortOrder)
		items = append(items, f)
	}
	if items == nil {
		items = []models.Fact{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func (h *FactsHandler) Create(w http.ResponseWriter, r *http.Request) {
	var f models.Fact
	if err := json.NewDecoder(r.Body).Decode(&f); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec("INSERT INTO facts (number, label, highlight, sort_order) VALUES (?, ?, ?, ?)",
		f.Number, f.Label, f.Highlight, f.SortOrder)
	if err != nil {
		http.Error(w, `{"error":"failed to create"}`, http.StatusInternalServerError)
		return
	}

	id, _ := result.LastInsertId()
	f.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(f)
}

func (h *FactsHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	var f models.Fact
	if err := json.NewDecoder(r.Body).Decode(&f); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec("UPDATE facts SET number=?, label=?, highlight=?, sort_order=? WHERE id=?",
		f.Number, f.Label, f.Highlight, f.SortOrder, id)
	if err != nil {
		http.Error(w, `{"error":"failed to update"}`, http.StatusInternalServerError)
		return
	}

	f.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(f)
}

func (h *FactsHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	if _, err := database.DB.Exec("DELETE FROM facts WHERE id=?", id); err != nil {
		http.Error(w, `{"error":"failed to delete"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "deleted"})
}
