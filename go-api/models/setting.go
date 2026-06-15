package models

// Setting is a single site-wide key/value configuration entry.
type Setting struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}
