const Home = ({ profile }) => {
  const firstName = profile?.name?.split(" ")[0] || "Alvin";

  return (
    <section className="home image" id="home">
      <div>
        <div className="position-relative">
          <h1>
            <span>
              <span className="animated-layer">
                Hello<span>.</span>
              </span>
            </span>
            <span className="position-relative">
              <span className="animated-layer">I am</span>
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
