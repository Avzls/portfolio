package models

type Profile struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Tagline   string `json:"tagline"`
	Age       string `json:"age"`
	Education string `json:"education"`
	Address   string `json:"address"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	PhotoURL  string `json:"photo_url"`
	CvURL     string `json:"cv_url"`
	Languages string `json:"languages"`
}
