package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"porto-api/config"
)

type UploadHandler struct {
	Config *config.Config
}

func (h *UploadHandler) Upload(w http.ResponseWriter, r *http.Request) {
	// 10 MB max
	r.ParseMultipartForm(10 << 20)

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, `{"error":"no file provided"}`, http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Validate file type
	ext := strings.ToLower(filepath.Ext(header.Filename))
	allowed := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".gif": true, ".webp": true, ".pdf": true}
	if !allowed[ext] {
		http.Error(w, `{"error":"file type not allowed"}`, http.StatusBadRequest)
		return
	}

	// Create subfolder from form field "folder" (e.g., "portfolio")
	folder := r.FormValue("folder")
	if folder == "" {
		folder = "general"
	}

	uploadPath := filepath.Join(h.Config.UploadDir, folder)
	os.MkdirAll(uploadPath, os.ModePerm)

	// Generate unique filename
	filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
	fullPath := filepath.Join(uploadPath, filename)

	out, err := os.Create(fullPath)
	if err != nil {
		http.Error(w, `{"error":"failed to save file"}`, http.StatusInternalServerError)
		return
	}
	defer out.Close()

	io.Copy(out, file)

	// Return the URL path
	urlPath := fmt.Sprintf("/uploads/%s/%s", folder, filename)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"url": urlPath})
}
