package models

type BlogPost struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Category string `json:"category"`
	Excerpt  string `json:"excerpt"`
	Content  string `json:"content"`
	ImageURL string `json:"image_url"`

	PostDate  string `json:"post_date"`
	Comments  int    `json:"comments"`
	SortOrder int    `json:"sort_order"`
}
