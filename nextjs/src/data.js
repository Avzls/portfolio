// Static site content.
//
// This replaces the old Go backend. Everything the homepage and blog render is
// defined here, so the site can be exported as a fully static bundle and hosted
// on GitHub Pages (no server, no database).
//
// Image/file paths point at files inside `public/` and are resolved through
// `resolveMedia()` (which also applies the GitHub Pages base path).

export const profile = {
  name: "Alvin Malik",
  tagline: "Hello. I am Alvin",
  age: "24 Years",
  education: "S.Kom",
  address: "Serang, Banten",
  phone: "089603396336",
  email: "alvinmalik1111@gmail.com",
  languages: "ID, ENG",
  photo_url: "/assets/pasfoto.jpg",
  cv_url: "/assets/ALVIN_MALIK.pdf",
};

export const settings = {
  site_title: "Alvin Malik Portfolio",
  hero_greeting: "Hello.",
  hero_intro: "I am",
  header_email: "alvinmalik1111@gmail.com",
  theme_color: "yellow",
  designer_name: "Avzl",
  designer_url: "",
};

export const skills = [
  { id: 1, name: "PHP", icon_class: "devicon-php-plain" },
  { id: 2, name: "Laravel", icon_class: "devicon-laravel-plain" },
  { id: 3, name: "React JS", icon_class: "devicon-react-plain" },
  { id: 4, name: "Next JS", icon_class: "devicon-nextjs-plain" },
  { id: 5, name: "SQL", icon_class: "devicon-mysql-plain" },
  { id: 6, name: "Bootstrap", icon_class: "devicon-bootstrap-plain" },
  { id: 7, name: "Node JS", icon_class: "devicon-nodejs-plain" },
  { id: 8, name: "Tailwind", icon_class: "devicon-tailwindcss-plain" },
];

export const experiences = [
  { id: 1, title: "Integrasi Pengolahan Diseminasi Statistika", company: "Badan Pusat Statistik", period: "2019 - 2020" },
  { id: 2, title: "Finshed Good", company: "PT. Nippon Indosari Corpindo", period: "2020 - 2021" },
  { id: 3, title: "Petugas Sortir", company: "PT. Kantor Pos Indonesia", period: "2021 - 2022" },
  { id: 4, title: "Customer Service", company: "PT. Bank Central Asia", period: "2022 - 2024" },
  { id: 5, title: "Backend Developer", company: "Dr.Chip", period: "2021 - 2024" },
  { id: 6, title: "IT Developer", company: "Lippo Group", period: "2025" },
  { id: 7, title: "IT Developer", company: "Yasunaga Indonesia", period: "2026" },
];

// Newest projects first (added from the /Project folder), followed by the
// earlier portfolio pieces.
export const portfolios = [
  { id: 101, title: "Syncra ERP", project_type: "Web App | ERP", client: "Syncra", duration: "3 months", framework: "Next.js, Laravel", image_url: "/assets/projects/Syncra ERP/Dashboard.png", preview_url: "#", video_url: "" },
  { id: 102, title: "Syncra Landing Page", project_type: "Landing Page", client: "Syncra", duration: "2 weeks", framework: "Next.js, Tailwind", image_url: "/assets/projects/Syncra Landing Page/Home.png", preview_url: "#", video_url: "" },
  { id: 103, title: "FitFeed", project_type: "Web App", client: "Personal", duration: "1 month", framework: "React, Node.js", image_url: "/assets/projects/FitFeed/Screenshot 2026-07-01 082025.png", preview_url: "#", video_url: "" },
  { id: 104, title: "Accounting Billing", project_type: "Web App", client: "Internal", duration: "1 month", framework: "Laravel", image_url: "/assets/projects/Accounting Billing/Home.png", preview_url: "#", video_url: "" },
  { id: 105, title: "BuatinCV", project_type: "Web App", client: "Personal", duration: "3 weeks", framework: "Next.js", image_url: "/assets/projects/BuatinCV/Home.png", preview_url: "#", video_url: "" },
  { id: 106, title: "E-Learning", project_type: "Web App", client: "Education", duration: "1 month", framework: "Laravel", image_url: "/assets/projects/Elearning/dashboard.png", preview_url: "#", video_url: "" },
  { id: 107, title: "Gallery Photographer", project_type: "Website", client: "Photographer", duration: "2 weeks", framework: "Next.js", image_url: "/assets/projects/Gallery Photographer/Home.png", preview_url: "#", video_url: "" },
  { id: 108, title: "Hugebites Meta Pixel", project_type: "Marketing Integration", client: "Hugebites", duration: "1 week", framework: "Meta Pixel, JS", image_url: "/assets/projects/Hugebites Meta Pixel/Home.png", preview_url: "#", video_url: "" },
  { id: 109, title: "Integrated Purchasing System", project_type: "Web App", client: "Enterprise", duration: "2 months", framework: "Laravel", image_url: "/assets/projects/Integrated Purchasing System/Home.png", preview_url: "#", video_url: "" },
  { id: 110, title: "Local Drive", project_type: "Web App", client: "Personal", duration: "3 weeks", framework: "Next.js", image_url: "/assets/projects/Local Drive/dashboard.png", preview_url: "#", video_url: "" },
  { id: 111, title: "POS Shoes", project_type: "POS App", client: "Ridar Shoes", duration: "1 month", framework: "Laravel Livewire", image_url: "/assets/projects/POS Shoes/dashboard.png", preview_url: "#", video_url: "" },
  { id: 112, title: "Stock Management", project_type: "Web App", client: "Retail", duration: "1 month", framework: "Laravel", image_url: "/assets/projects/Stock Management/Screenshot 2026-07-01 083342.png", preview_url: "#", video_url: "" },
  { id: 113, title: "Surat Generator RT", project_type: "Web App", client: "RT / RW", duration: "2 weeks", framework: "Laravel", image_url: "/assets/projects/Surat Generator RT/Home.png", preview_url: "#", video_url: "" },
  { id: 1, title: "E-Commerce", project_type: "Website", client: "Ridar Shoes", duration: "1 month", framework: "Laravel", image_url: "/assets/portfolio/ridar.jpg", preview_url: "#", video_url: "" },
  { id: 2, title: "Cover Mars Pos Indonesia", project_type: "Contest | Editor", client: "Kantor Pos Indonesia", duration: "1 Week", framework: "After Effect & Premiere Pro", image_url: "", preview_url: "#", video_url: "https://www.youtube.com/embed/fGXhjsOa0XE" },
  { id: 3, title: "Recruitment", project_type: "WebApp", client: "PT Banten Realti Indonesia", duration: "1 month", framework: "Laravel Livewire 3", image_url: "/assets/portfolio/bri1.png", preview_url: "#", video_url: "" },
  { id: 4, title: "PMB", project_type: "Penerimaan Mahasiswa Baru", client: "Universitas Banten Jaya", duration: "1 Days", framework: "Codeigniter", image_url: "/assets/portfolio/unbaja.png", preview_url: "#", video_url: "" },
];

export const socialLinks = [
  { id: 1, platform: "GitHub", url: "https://github.com/Avzls", icon_class: "fa-brands fa-github" },
  { id: 2, platform: "Instagram", url: "https://www.instagram.com/avzl_/", icon_class: "fa-brands fa-instagram" },
  { id: 3, platform: "Facebook", url: "https://www.facebook.com/AlviNaomi/", icon_class: "fa-brands fa-facebook" },
];

export const facts = [
  { id: 1, number: "4", label: "years of", highlight: "experience" },
  { id: 2, number: "17", label: "completed", highlight: "projects" },
  { id: 3, number: "56", label: "Happy", highlight: "customers" },
  { id: 4, number: "13", label: "awards", highlight: "won" },
  { id: 5, number: "32", label: "learned", highlight: "frameworks" },
];

export const clients = [
  { id: 1, name: "ThemeForest", logo_url: "/assets/logos/themeforest-dark-background.png" },
  { id: 2, name: "PhotoDune", logo_url: "/assets/logos/photodune-dark-background.png" },
  { id: 3, name: "GraphicRiver", logo_url: "/assets/logos/graphicriver-dark-background.png" },
  { id: 4, name: "CodeCanyon", logo_url: "/assets/logos/codecanyon-dark-background.png" },
  { id: 5, name: "AudioJungle", logo_url: "/assets/logos/audiojungle-dark-background.png" },
  { id: 6, name: "ActiveDen", logo_url: "/assets/logos/activeden-dark-background.png" },
];

export const blogPosts = [
  { id: 1, title: "How To Publish Content That Ranks On Google", category: "design", excerpt: "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", content: "", image_url: "/assets/blog/blog-post-1.jpg", post_date: "9 Apr 2022", comments: 17 },
  { id: 2, title: "How Efficient Site Structure Can Boost SEO", category: "development", excerpt: "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", content: "", image_url: "/assets/blog/blog-post-2.jpg", post_date: "21 Feb 2022", comments: 34 },
  { id: 3, title: "Change Management for Customer Success", category: "essentials", excerpt: "ncididunt ut labore et dolore magna aliqua. Ut enim aminim veniam...", content: "", image_url: "/assets/blog/blog-post-3.jpg", post_date: "1 Jan 2022", comments: 10 },
];

const siteData = {
  profile,
  settings,
  skills,
  experiences,
  portfolios,
  socialLinks,
  facts,
  clients,
  blogPosts,
};

export default siteData;
