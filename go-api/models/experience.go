package models

type Experience struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Company   string `json:"company"`
	Period    string `json:"period"`
	SortOrder int    `json:"sort_order"`
}
