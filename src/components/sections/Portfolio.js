import { salimovSlider } from "@/src/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

// Newest projects first, then the earlier ones.
// Item types: `video` (YouTube embed), `images` (mini gallery), or `image`.
const projects = [
  { title: "Syncra ERP", type: "Web App | ERP", client: "Syncra", duration: "3 months", framework: "Next.js, Laravel", image: "assets/projects/Syncra ERP/Dashboard.png" },
  { title: "Syncra Landing Page", type: "Landing Page", client: "Syncra", duration: "2 weeks", framework: "Next.js, Tailwind", image: "assets/projects/Syncra Landing Page/Home.png" },
  { title: "FitFeed", type: "Web App", client: "Personal", duration: "1 month", framework: "React, Node.js", image: "assets/projects/FitFeed/Screenshot 2026-07-01 082025.png" },
  { title: "Accounting Billing", type: "Web App", client: "Internal", duration: "1 month", framework: "Laravel", image: "assets/projects/Accounting Billing/Home.png" },
  { title: "BuatinCV", type: "Web App", client: "Personal", duration: "3 weeks", framework: "Next.js", image: "assets/projects/BuatinCV/Home.png" },
  { title: "E-Learning", type: "Web App", client: "Education", duration: "1 month", framework: "Laravel", image: "assets/projects/Elearning/dashboard.png" },
  { title: "Gallery Photographer", type: "Website", client: "Photographer", duration: "2 weeks", framework: "Next.js", image: "assets/projects/Gallery Photographer/Home.png" },
  { title: "Hugebites Meta Pixel", type: "Marketing Integration", client: "Hugebites", duration: "1 week", framework: "Meta Pixel, JS", image: "assets/projects/Hugebites Meta Pixel/Home.png" },
  { title: "Integrated Purchasing System", type: "Web App", client: "Enterprise", duration: "2 months", framework: "Laravel", image: "assets/projects/Integrated Purchasing System/Home.png" },
  { title: "Local Drive", type: "Web App", client: "Personal", duration: "3 weeks", framework: "Next.js", image: "assets/projects/Local Drive/dashboard.png" },
  { title: "POS Shoes", type: "POS App", client: "Ridar Shoes", duration: "1 month", framework: "Laravel Livewire", image: "assets/projects/POS Shoes/dashboard.png" },
  { title: "Stock Management", type: "Web App", client: "Retail", duration: "1 month", framework: "Laravel", image: "assets/projects/Stock Management/Screenshot 2026-07-01 083342.png" },
  { title: "Surat Generator RT", type: "Web App", client: "RT / RW", duration: "2 weeks", framework: "Laravel", image: "assets/projects/Surat Generator RT/Home.png" },
  { title: "E-Commerce", type: "Website", client: "Ridar Shoes", duration: "1 months", framework: "Laravel", image: "assets/portfolio/ridar.jpg" },
  { title: "Cover Mars Pos Indonesia", type: "Contest | Editor", client: "Kantor Pos Indonesia", duration: "1 Week", framework: "After Effect & Premiere Pro", video: "https://www.youtube.com/embed/fGXhjsOa0XE" },
  { title: "Recruitment", type: "WebApp", client: "PT Banten Realti Indonesia", duration: "1 months", framework: "Laravel Livewire 3", images: ["assets/portfolio/bri1.png", "assets/portfolio/bri2.png", "assets/portfolio/bri3.png"] },
  { title: "PMB", type: "Penerimaan Mahasiswa Baru", client: "Universitas Banten Jaya", duration: "1 Days", framework: "Codeigniter", image: "assets/portfolio/unbaja.png" },
];

const Portfolio = () => {
  // Lightbox: the image currently zoomed in (null = closed).
  const [zoom, setZoom] = useState(null);
  const open = (src, title) => setZoom({ src, title });
  const close = () => setZoom(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <section className="portfolio main-section flex-column-mobile" id="portfolio">
      {/* TITLE STARTS */}
      <div className="custom-title">
        <h3>
          <span>
            <span className="animated-layer fade-in-left-animation fadeInUp wow">
              My Portfolio
            </span>
          </span>
        </h3>
      </div>
      {/* TITLE ENDS */}
      <Swiper
        {...salimovSlider.portfolio}
        className="swiper swiper-portfolio animated-layer fade-in-right-animation fadeInUp wow"
        data-wow-offset={200}
      >
        {projects.map((p, i) => (
          <SwiperSlide key={i} className="single-item swiper-slide">
            {/* MAIN CONTENT */}
            <div className="main-content">
              {p.video ? (
                <div className="videocontainer">
                  <iframe className="youtube-video" src={p.video} allowFullScreen="" />
                </div>
              ) : p.images ? (
                <Swiper {...salimovSlider.portfolioItems} className="swiper swiper-portfolio-item">
                  {p.images.map((img, j) => (
                    <SwiperSlide key={j} className="swiper-slide">
                      <img
                        src={img}
                        title="img"
                        alt={p.title}
                        style={{ cursor: "zoom-in" }}
                        onClick={() => open(img, p.title)}
                      />
                    </SwiperSlide>
                  ))}
                  <div className="swiper-pagination" />
                </Swiper>
              ) : (
                <img
                  className="img-fluid"
                  src={p.image}
                  alt={p.title}
                  style={{ cursor: "zoom-in" }}
                  onClick={() => open(p.image, p.title)}
                />
              )}
            </div>
            {/* DETAILS */}
            <div className="details">
              <h4>{p.title}</h4>
              <div>
                <ul>
                  <li>
                    <span>
                      <i className="fa-regular fa-file-lines" /> Project :
                    </span>
                    <span>{p.type}</span>
                  </li>
                  <li>
                    <span>
                      <i className="fa-regular fa-user" /> Client :
                    </span>
                    <span>{p.client}</span>
                  </li>
                  <li>
                    <span>
                      <i className="fa-regular fa-hourglass" /> Duration :
                    </span>
                    <span>{p.duration}</span>
                  </li>
                  <li>
                    <span>
                      <i className="fa-solid fa-code-branch" /> Frameworks :
                    </span>
                    <span>{p.framework}</span>
                  </li>
                </ul>
              </div>
              <a href="#" target="_blank" className="custom-btn">
                <span>
                  preview <i className="fa-solid fa-arrow-up-right-from-square" />
                </span>
              </a>
            </div>
          </SwiperSlide>
        ))}
        <div className="nav-item next-item animated-btn">
          <span />
        </div>
        <div className="nav-item prev-item animated-btn">
          <span />
        </div>
      </Swiper>
      <img alt="" className="separator hide-mobile" src="assets/separator.png" />

      {/* Lightbox / zoom preview */}
      {zoom && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <button
            onClick={close}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "18px",
              right: "24px",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "40px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>
          <img
            src={zoom.src}
            alt={zoom.title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "92vw",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
              cursor: "default",
            }}
          />
          {zoom.title && (
            <span
              style={{
                position: "absolute",
                bottom: "18px",
                left: 0,
                right: 0,
                textAlign: "center",
                color: "#fff",
                fontSize: "15px",
              }}
            >
              {zoom.title}
            </span>
          )}
        </div>
      )}
    </section>
  );
};
export default Portfolio;
