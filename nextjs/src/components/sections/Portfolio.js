import { salimovSlider } from "@/src/sliderProps";
import { resolveMedia, asset } from "@/src/media";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";


const Portfolio = ({ portfolios }) => {
  // Lightbox state: the image currently zoomed in (null = closed).
  const [zoom, setZoom] = useState(null);

  const open = (src, title) => setZoom({ src, title });
  const close = () => setZoom(null);

  // Close on Escape and lock page scroll while open.
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <section className="portfolio main-section flex-column-mobile" id="portfolio">
      <div className="custom-title">
        <h3>
          <span>
            <span className="animated-layer fade-in-left-animation fadeInUp wow">
              My Portfolio
            </span>
          </span>
        </h3>
      </div>
      <Swiper
        {...salimovSlider.portfolio}
        className="swiper swiper-portfolio animated-layer fade-in-right-animation fadeInUp wow"
        data-wow-offset={200}
      >
        {(portfolios || []).map((item) => (
          <SwiperSlide key={item.id} className="single-item swiper-slide">
            <div className="main-content">
              {item.video_url ? (
                <div className="videocontainer">
                  <iframe
                    className="youtube-video"
                    src={item.video_url}
                    allowFullScreen=""
                  />
                </div>
              ) : (
                <img
                  className="img-fluid"
                  src={resolveMedia(item.image_url)}
                  alt={item.title}
                  style={{ cursor: "zoom-in" }}
                  onClick={() => open(resolveMedia(item.image_url), item.title)}
                />

              )}
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <div>
                <ul>
                  <li>
                    <span>
                      <i className="fa-regular fa-file-lines" /> Project :
                    </span>
                    <span>{item.project_type}</span>
                  </li>
                  <li>
                    <span>
                      <i className="fa-regular fa-user" /> Client :
                    </span>
                    <span>{item.client}</span>
                  </li>
                  <li>
                    <span>
                      <i className="fa-regular fa-hourglass" /> Duration :
                    </span>
                    <span>{item.duration}</span>
                  </li>
                  <li>
                    <span>
                      <i className="fa-solid fa-code-branch" /> Frameworks :
                    </span>
                    <span>{item.framework}</span>
                  </li>
                </ul>
              </div>
              {item.preview_url && item.preview_url !== "#" && (
                <a href={item.preview_url} target="_blank" className="custom-btn">
                  <span>
                    preview <i className="fa-solid fa-arrow-up-right-from-square" />
                  </span>
                </a>
              )}
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
      <img alt="" className="separator hide-mobile" src={asset("/assets/separator.png")} />

      {/* Lightbox / zoom preview */}
      {zoom && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 0, 0, 0.9)",
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
                letterSpacing: "0.5px",
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
