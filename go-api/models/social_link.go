package models

type SocialLink struct {
	ID        int    `json:"id"`
	Platform  string `json:"platform"`
	URL       string `json:"url"`
	IconClass string `json:"icon_class"`
	SortOrder int    `json:"sort_order"`
}
