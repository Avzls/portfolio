import { salimovSlider } from "@/src/sliderProps";
import { resolveMedia, asset } from "@/src/media";
import { Swiper, SwiperSlide } from "swiper/react";

// Group clients into pairs so each slide shows two logos (matches the theme).

const chunkPairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push(arr.slice(i, i + 2));
  }
  return pairs;
};

const Clients = ({ clients }) => {
  const pairs = chunkPairs(clients || []);

  return (
    <section className="clients">
      <div className="clients-container animated-layer fade-in-right-animation fadeInUp wow">
        <h3>My Clients</h3>
        <Swiper
          {...salimovSlider.clients}
          className="swiper swiper-clients fadeInUp wow"
        >
          {pairs.map((pair, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              {pair.map((client) => (
                <div key={client.id}>
                  <img src={resolveMedia(client.logo_url)} alt={client.name} />

                </div>
              ))}
            </SwiperSlide>
          ))}
          <div className="swiper-pagination" />
        </Swiper>
      </div>
      <img
        alt=""
        className="z-1 hide-mobile opposite-separator"
        src={asset("/assets/separator-opposite.png")}
      />
    </section>
  );
};
export default Clients;
