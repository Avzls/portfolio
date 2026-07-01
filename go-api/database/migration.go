package database

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

func Migrate() {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS profile (
			id INT PRIMARY KEY DEFAULT 1,
			name VARCHAR(100) NOT NULL DEFAULT '',
			tagline VARCHAR(200) NOT NULL DEFAULT '',
			age VARCHAR(20) NOT NULL DEFAULT '',
			education VARCHAR(100) NOT NULL DEFAULT '',
			address VARCHAR(200) NOT NULL DEFAULT '',
			phone VARCHAR(30) NOT NULL DEFAULT '',
			email VARCHAR(100) NOT NULL DEFAULT '',
			photo_url VARCHAR(255) NOT NULL DEFAULT '',
			cv_url VARCHAR(255) NOT NULL DEFAULT '',
			languages VARCHAR(100) NOT NULL DEFAULT '',
			CHECK (id = 1)
		)`,
		`CREATE TABLE IF NOT EXISTS skills (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			icon_class VARCHAR(100) NOT NULL DEFAULT '',
			sort_order INT NOT NULL DEFAULT 0
		)`,
		`CREATE TABLE IF NOT EXISTS experiences (
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(200) NOT NULL,
			company VARCHAR(200) NOT NULL DEFAULT '',
			period VARCHAR(50) NOT NULL DEFAULT '',
			sort_order INT NOT NULL DEFAULT 0
		)`,
		`CREATE TABLE IF NOT EXISTS portfolios (
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(200) NOT NULL,
			project_type VARCHAR(100) NOT NULL DEFAULT '',
			client VARCHAR(200) NOT NULL DEFAULT '',
			duration VARCHAR(50) NOT NULL DEFAULT '',
			framework VARCHAR(200) NOT NULL DEFAULT '',
			image_url VARCHAR(255) NOT NULL DEFAULT '',
			preview_url VARCHAR(255) NOT NULL DEFAULT '',
			video_url VARCHAR(255) NOT NULL DEFAULT '',
			sort_order INT NOT NULL DEFAULT 0
		)`,
		`CREATE TABLE IF NOT EXISTS social_links (
			id INT AUTO_INCREMENT PRIMARY KEY,
			platform VARCHAR(50) NOT NULL,
			url VARCHAR(255) NOT NULL DEFAULT '',
			icon_class VARCHAR(100) NOT NULL DEFAULT '',
			sort_order INT NOT NULL DEFAULT 0
		)`,
		`CREATE TABLE IF NOT EXISTS admins (
			id INT AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(50) NOT NULL UNIQUE,
			password_hash VARCHAR(255) NOT NULL
		)`,
		`CREATE TABLE IF NOT EXISTS settings (
			setting_key VARCHAR(100) PRIMARY KEY,
			setting_value VARCHAR(500) NOT NULL DEFAULT ''
		)`,
		`CREATE TABLE IF NOT EXISTS facts (
			id INT AUTO_INCREMENT PRIMARY KEY,
			number VARCHAR(20) NOT NULL DEFAULT '',
			label VARCHAR(100) NOT NULL DEFAULT '',
			highlight VARCHAR(100) NOT NULL DEFAULT '',
			sort_order INT NOT NULL DEFAULT 0
		)`,
		`CREATE TABLE IF NOT EXISTS clients (
			id INT AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(150) NOT NULL DEFAULT '',
			logo_url VARCHAR(255) NOT NULL DEFAULT '',
			sort_order INT NOT NULL DEFAULT 0
		)`,
		`CREATE TABLE IF NOT EXISTS blog_posts (
			id INT AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(200) NOT NULL DEFAULT '',
			category VARCHAR(100) NOT NULL DEFAULT '',
			excerpt VARCHAR(500) NOT NULL DEFAULT '',
			content TEXT,
			image_url VARCHAR(255) NOT NULL DEFAULT '',
			post_date VARCHAR(50) NOT NULL DEFAULT '',

			comments INT NOT NULL DEFAULT 0,
			sort_order INT NOT NULL DEFAULT 0
		)`,
	}

	for _, q := range queries {
		if _, err := DB.Exec(q); err != nil {
			log.Fatalf("Migration failed: %v", err)
		}
	}

	// Ensure default settings exist (idempotent, also covers pre-existing databases)
	defaultSettings := []struct{ key, value string }{
		{"site_title", "Alvin Malik Portfolio"},
		{"hero_greeting", "Hello."},
		{"hero_intro", "I am"},
		{"header_email", "alvinmalik1111@gmail.com"},
		{"theme_color", "yellow"},
		{"designer_name", "Avzl"},
		{"designer_url", ""},
	}
	for _, s := range defaultSettings {
		DB.Exec("INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?, ?)", s.key, s.value)
	}

	// Add content column to blog_posts for pre-existing databases (idempotent).
	DB.Exec("ALTER TABLE blog_posts ADD COLUMN content TEXT")

	seedNewTables()

	log.Println("✅ Database migrated")
}

// seedNewTables seeds tables that were added after the initial Seed() run.
// Each block only inserts when its table is empty, so it is safe for both
// fresh and pre-existing databases.
func seedNewTables() {
	var n int

	DB.QueryRow("SELECT COUNT(*) FROM facts").Scan(&n)
	if n == 0 {
		facts := []struct{ number, label, highlight string }{
			{"4", "years of", "experience"},
			{"6", "completed", "projects"},
			{"56", "Happy", "customers"},
			{"13", "awards", "won"},
			{"32", "learned", "frameworks"},
		}
		for i, f := range facts {
			DB.Exec("INSERT INTO facts (number, label, highlight, sort_order) VALUES (?, ?, ?, ?)", f.number, f.label, f.highlight, i+1)
		}
	}

	DB.QueryRow("SELECT COUNT(*) FROM clients").Scan(&n)
	if n == 0 {
		clients := []struct{ name, logo string }{
			{"ThemeForest", "/assets/logos/themeforest-dark-background.png"},
			{"PhotoDune", "/assets/logos/photodune-dark-background.png"},
			{"GraphicRiver", "/assets/logos/graphicriver-dark-background.png"},
			{"CodeCanyon", "/assets/logos/codecanyon-dark-background.png"},
			{"AudioJungle", "/assets/logos/audiojungle-dark-background.png"},
			{"ActiveDen", "/assets/logos/activeden-dark-background.png"},
		}
		for i, c := range clients {
			DB.Exec("INSERT INTO clients (name, logo_url, sort_order) VALUES (?, ?, ?)", c.name, c.logo, i+1)
		}
	}

	DB.QueryRow("SELECT COUNT(*) FROM blog_posts").Scan(&n)
	if n == 0 {
		posts := []struct {
			title, category, excerpt, image, date string
			comments                              int
		}{
			{"How To Publish Content That Ranks On Google", "design", "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", "/assets/blog/blog-post-1.jpg", "9 Apr 2022", 17},
			{"How Efficient Site Structure Can Boost SEO", "development", "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", "/assets/blog/blog-post-2.jpg", "21 Feb 2022", 34},
			{"Change Management for Customer Success", "essentials", "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", "/assets/blog/blog-post-3.jpg", "1 Jan 2022", 10},
		}
		for i, p := range posts {
			DB.Exec("INSERT INTO blog_posts (title, category, excerpt, image_url, post_date, comments, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
				p.title, p.category, p.excerpt, p.image, p.date, p.comments, i+1)
		}
	}
}

func Seed() {
	// Check if already seeded
	var count int
	DB.QueryRow("SELECT COUNT(*) FROM profile").Scan(&count)
	if count > 0 {
		log.Println("⏭️  Database already seeded, skipping")
		return
	}

	// Profile
	DB.Exec(`INSERT INTO profile (id, name, tagline, age, education, address, phone, email, photo_url, cv_url, languages) 
		VALUES (1, 'Alvin Malik', 'Hello. I am Alvin', '24 Years', 'S.Kom', 'Serang, Banten', '089603396336', 'alvinmalik1111@gmail.com', '/uploads/pasfoto.jpg', '/uploads/ALVIN_MALIK.pdf', 'ID, ENG')`)

	// Skills
	skills := []struct{ name, icon string }{
		{"PHP", "devicon-php-plain"},
		{"Laravel", "devicon-laravel-plain"},
		{"React JS", "devicon-react-plain"},
		{"Next JS", "devicon-nextjs-plain"},
		{"SQL", "devicon-mysql-plain"},
		{"Bootstrap", "devicon-bootstrap-plain"},
		{"Node JS", "devicon-nodejs-plain"},
		{"Tailwind", "devicon-tailwindcss-plain"},
	}
	for i, s := range skills {
		DB.Exec("INSERT INTO skills (name, icon_class, sort_order) VALUES (?, ?, ?)", s.name, s.icon, i+1)
	}

	// Experiences
	experiences := []struct{ title, company, period string }{
		{"Integrasi Pengolahan Diseminasi Statistika", "Badan Pusat Statistik", "2019 - 2020"},
		{"Finshed Good", "PT. Nippon Indosari Corpindo", "2020 - 2021"},
		{"Petugas Sortir", "PT. Kantor Pos Indonesia", "2021 - 2022"},
		{"Customer Service", "PT. Bank Central Asia", "2022 - 2024"},
		{"Backend Developer", "Dr.Chip", "2021 - 2024"},
	}
	for i, e := range experiences {
		DB.Exec("INSERT INTO experiences (title, company, period, sort_order) VALUES (?, ?, ?, ?)", e.title, e.company, e.period, i+1)
	}

	// Portfolios
	portfolios := []struct{ title, projectType, client, duration, framework, imageURL, previewURL, videoURL string }{
		{"E-Commerce", "Website", "Ridar Shoes", "1 months", "Laravel", "/uploads/portfolio/ridar.jpg", "#", ""},
		{"Cover Mars Pos Indonesia", "Contest | Editor", "Kantor Pos Indonesia", "1 Week", "After Effect & Premiere Pro", "", "#", "https://www.youtube.com/embed/fGXhjsOa0XE"},
		{"Recruitment", "WebApp", "PT Banten Realti Indonesia", "1 months", "Laravel Livewire 3", "/uploads/portfolio/bri1.png", "#", ""},
		{"PMB", "Penerimaan Mahasiswa Baru", "Universitas Banten Jaya", "1 Days", "Codeigniter", "/uploads/portfolio/unbaja.png", "#", ""},
	}
	for i, p := range portfolios {
		DB.Exec(`INSERT INTO portfolios (title, project_type, client, duration, framework, image_url, preview_url, video_url, sort_order) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, p.title, p.projectType, p.client, p.duration, p.framework, p.imageURL, p.previewURL, p.videoURL, i+1)
	}

	// Social Links
	socials := []struct{ platform, url, icon string }{
		{"GitHub", "https://github.com/Avzls", "fa-brands fa-github"},
		{"Instagram", "https://www.instagram.com/avzl_/", "fa-brands fa-instagram"},
		{"Facebook", "https://www.facebook.com/AlviNaomi/", "fa-brands fa-facebook"},
	}
	for i, s := range socials {
		DB.Exec("INSERT INTO social_links (platform, url, icon_class, sort_order) VALUES (?, ?, ?, ?)", s.platform, s.url, s.icon, i+1)
	}

	// Facts
	facts := []struct {
		number, label, highlight string
	}{
		{"4", "years of", "experience"},
		{"6", "completed", "projects"},
		{"56", "Happy", "customers"},
		{"13", "awards", "won"},
		{"32", "learned", "frameworks"},
	}
	for i, f := range facts {
		DB.Exec("INSERT INTO facts (number, label, highlight, sort_order) VALUES (?, ?, ?, ?)", f.number, f.label, f.highlight, i+1)
	}

	// Clients
	clients := []struct{ name, logo string }{
		{"ThemeForest", "/assets/logos/themeforest-dark-background.png"},
		{"PhotoDune", "/assets/logos/photodune-dark-background.png"},
		{"GraphicRiver", "/assets/logos/graphicriver-dark-background.png"},
		{"CodeCanyon", "/assets/logos/codecanyon-dark-background.png"},
		{"AudioJungle", "/assets/logos/audiojungle-dark-background.png"},
		{"ActiveDen", "/assets/logos/activeden-dark-background.png"},
	}
	for i, c := range clients {
		DB.Exec("INSERT INTO clients (name, logo_url, sort_order) VALUES (?, ?, ?)", c.name, c.logo, i+1)
	}

	// Blog posts
	posts := []struct {
		title, category, excerpt, image, date string
		comments                              int
	}{
		{"How To Publish Content That Ranks On Google", "design", "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", "/assets/blog/blog-post-1.jpg", "9 Apr 2022", 17},
		{"How Efficient Site Structure Can Boost SEO", "development", "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", "/assets/blog/blog-post-2.jpg", "21 Feb 2022", 34},
		{"Change Management for Customer Success", "essentials", "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", "/assets/blog/blog-post-3.jpg", "1 Jan 2022", 10},
	}
	for i, p := range posts {
		DB.Exec("INSERT INTO blog_posts (title, category, excerpt, image_url, post_date, comments, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
			p.title, p.category, p.excerpt, p.image, p.date, p.comments, i+1)
	}

	// Admin user
	hash, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
	DB.Exec("INSERT INTO admins (username, password_hash) VALUES (?, ?)", "admin", string(hash))

	log.Println("✅ Database seeded with initial data")

}
