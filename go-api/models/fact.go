package models

type Fact struct {
	ID        int    `json:"id"`
	Number    string `json:"number"`
	Label     string `json:"label"`     // e.g. "years of"
	Highlight string `json:"highlight"` // e.g. "experience"
	SortOrder int    `json:"sort_order"`
}
