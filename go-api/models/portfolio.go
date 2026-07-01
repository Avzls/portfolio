package models

type Portfolio struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	ProjectType string `json:"project_type"`
	Client      string `json:"client"`
	Duration    string `json:"duration"`
	Framework   string `json:"framework"`
	ImageURL    string `json:"image_url"`
	PreviewURL  string `json:"preview_url"`
	VideoURL    string `json:"video_url"`
	SortOrder   int    `json:"sort_order"`
}
