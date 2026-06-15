package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"porto-api/database"
	"porto-api/models"

	"github.com/go-chi/chi/v5"
)

type ClientsHandler struct{}

func (h *ClientsHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT id, name, logo_url, sort_order FROM clients ORDER BY sort_order")
	if err != nil {
		http.Error(w, `{"error":"failed to fetch"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var items []models.Client
	for rows.Next() {
		var c models.Client
		rows.Scan(&c.ID, &c.Name, &c.LogoURL, &c.SortOrder)
		items = append(items, c)
	}
	if items == nil {
		items = []models.Client{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func (h *ClientsHandler) Create(w http.ResponseWriter, r *http.Request) {
	var c models.Client
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec("INSERT INTO clients (name, logo_url, sort_order) VALUES (?, ?, ?)",
		c.Name, c.LogoURL, c.SortOrder)
	if err != nil {
		http.Error(w, `{"error":"failed to create"}`, http.StatusInternalServerError)
		return
	}

	id, _ := result.LastInsertId()
	c.ID = int(id)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(c)
}

func (h *ClientsHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	var c models.Client
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec("UPDATE clients SET name=?, logo_url=?, sort_order=? WHERE id=?",
		c.Name, c.LogoURL, c.SortOrder, id)
	if err != nil {
		http.Error(w, `{"error":"failed to update"}`, http.StatusInternalServerError)
		return
	}

	c.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(c)
}

func (h *ClientsHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))
	if _, err := database.DB.Exec("DELETE FROM clients WHERE id=?", id); err != nil {
		http.Error(w, `{"error":"failed to delete"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "deleted"})
}
