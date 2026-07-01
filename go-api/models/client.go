package models

type Client struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	LogoURL   string `json:"logo_url"`
	SortOrder int    `json:"sort_order"`
}
