package models

type Skill struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	IconClass string `json:"icon_class"`
	SortOrder int    `json:"sort_order"`
}
