import { salimovSlider } from "@/src/sliderProps";
import { resolveMedia, asset } from "@/src/media";
import { Swiper, SwiperSlide } from "swiper/react";


const Portfolio = ({ portfolios }) => {
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
    </section>
  );
};
export default Portfolio;
