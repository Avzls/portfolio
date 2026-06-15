package handlers

import (
	"encoding/json"
	"net/http"

	"porto-api/database"
	"porto-api/models"
)

type ProfileHandler struct{}

func (h *ProfileHandler) Get(w http.ResponseWriter, r *http.Request) {
	var p models.Profile
	err := database.DB.QueryRow(`SELECT id, name, tagline, age, education, address, phone, email, photo_url, cv_url, languages FROM profile WHERE id = 1`).
		Scan(&p.ID, &p.Name, &p.Tagline, &p.Age, &p.Education, &p.Address, &p.Phone, &p.Email, &p.PhotoURL, &p.CvURL, &p.Languages)
	if err != nil {
		http.Error(w, `{"error":"profile not found"}`, http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

func (h *ProfileHandler) Update(w http.ResponseWriter, r *http.Request) {
	var p models.Profile
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(`UPDATE profile SET name=?, tagline=?, age=?, education=?, address=?, phone=?, email=?, photo_url=?, cv_url=?, languages=? WHERE id=1`,
		p.Name, p.Tagline, p.Age, p.Education, p.Address, p.Phone, p.Email, p.PhotoURL, p.CvURL, p.Languages)
	if err != nil {
		http.Error(w, `{"error":"failed to update"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "profile updated"})
}
