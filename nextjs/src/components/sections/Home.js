const Home = ({ profile, settings }) => {
  const firstName = profile?.name?.split(" ")[0] || "Alvin";
  const greeting = settings?.hero_greeting || "Hello.";
  const intro = settings?.hero_intro || "I am";

  return (
    <section className="home image" id="home">
      <div>
        <div className="position-relative">
          <h1>
            <span>
              <span className="animated-layer">{greeting}</span>
            </span>
            <span className="position-relative">
              <span className="animated-layer">{intro}</span>
              <span className="intro animated-layer">
                
              </span>
            </span>
            <span>
              <span className="animated-layer">{firstName}</span>
            </span>
          </h1>
        </div>
      </div>

      <span className="animated-layer animated-btn cta" id="cta">
        <span></span>
      </span>
    </section>
  );
};
export default Home;
