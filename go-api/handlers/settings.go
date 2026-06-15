package handlers

import (
	"encoding/json"
	"net/http"

	"porto-api/database"
)

type SettingsHandler struct{}

// List returns all settings as a flat key/value object: { "site_title": "...", ... }
func (h *SettingsHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := database.DB.Query("SELECT setting_key, setting_value FROM settings")
	if err != nil {
		http.Error(w, `{"error":"failed to fetch"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	result := map[string]string{}
	for rows.Next() {
		var key, value string
		rows.Scan(&key, &value)
		result[key] = value
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

// Update accepts a flat key/value object and upserts each entry.
func (h *SettingsHandler) Update(w http.ResponseWriter, r *http.Request) {
	var payload map[string]string
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	for key, value := range payload {
		_, err := database.DB.Exec(
			"INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
			key, value, value,
		)
		if err != nil {
			http.Error(w, `{"error":"failed to update"}`, http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "settings updated"})
}
