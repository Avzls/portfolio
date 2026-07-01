const About = () => {
  return (
    <section className="about main-section flex-column-mobile" id="about">
      {/* INFO HOLDER STARTS */}
      <div className="info flex-column-mobile">
        {/* IMAGE STARTS */}
        <div
          className="img-container animated-layer image-animation my-photo-container fadeInUp wow"
          data-wow-offset={200}
          id="my-photo"
        >
          <div>
            <div>
              <img className="my-photo" src="assets/pasfoto.jpg" alt="" />
            </div>
          </div>
        </div>
        {/* IMAGE ENDS */}
        {/* INFO STARTS */}
        <div>
          <h2>
            <span>
              <span className="animated-layer fade-in-up-animation fadeInUp wow">
                Alvin
              </span>
            </span>
            <span>
              <span className="animated-layer fade-in-up-animation fadeInUp wow">
                Malik
              </span>
            </span>
          </h2>
          <div className="infos">
            <ul>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Age :</span>
                    <span>24 Years</span>
                  </span>
                </span>
              </li>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Education :</span>
                    <span>S.Kom</span>
                  </span>
                </span>
              </li>
             
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Langages :</span>
                    <span>ID, ENG</span>
                  </span>
                </span>
              </li>
            </ul>
            <ul>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Address :</span>
                    <span>Serang, Banten</span>
                  </span>
                </span>
              </li>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Phone :</span>
                    <span>089603396336</span>
                  </span>
                </span>
              </li>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Email :</span>
                    <span>alvinmalik1111@gmail.com</span>
                  </span>
                </span>
              </li>
             
            </ul>
          </div>
          <div className="download-cv-button">
            <a href="assets/ALVIN_MALIK.pdf" download>
              Download CV
            </a>
          </div>
        </div>
        {/* INFO ENDS */}
      </div>
      {/* INFO HOLDER ENDS */}
      {/* SKILLS STARTS */}
      <div className="skills flex-column-mobile">
        {/* TITLE STARTS */}
        <div className="custom-title">
          {/* MAIN TITLE STARTS */}
          <h3>
            <span>
              <span className="animated-layer fade-in-left-animation fadeInUp wow">
                My Skills
              </span>
            </span>
          </h3>
          {/* MAIN TITLE ENDS */}
        </div>
        {/* TITLE ENDS */}
        <div className="skills-content">
          <div>
            {/* SKILL ITEM STARTS */}
<div className="animated-layer fade-in-down-animation fadeInLeft wow">
  <span>
    <i className="devicon-php-plain" />
  </span>
  <h4>PHP</h4>
</div>
{/* SKILL ITEM ENDS */}
{/* SKILL ITEM STARTS */}
<div className="animated-layer fade-in-up-animation fadeInRight wow">
  <span>
    <i className="devicon-laravel-plain" />
  </span>
  <h4>Laravel</h4>
</div>
{/* SKILL ITEM ENDS */}
</div>

<div>
  {/* SKILL ITEM STARTS */}
  <div className="animated-layer fade-in-down-animation fadeInLeft wow">
    <span>
      <i className="devicon-react-plain" />
    </span>
    <h4>React JS</h4>
  </div>
  {/* SKILL ITEM ENDS */}
  {/* SKILL ITEM STARTS */}
  <div className="animated-layer fade-in-up-animation fadeInRight wow">
    <span>
      <i className="devicon-nextjs-plain" />
    </span>
    <h4>Next JS</h4>
  </div>
  {/* SKILL ITEM ENDS */}
</div>

<div>
  {/* SKILL ITEM STARTS */}
  <div className="animated-layer fade-in-down-animation fadeInLeft wow">
    <span>
      <i className="devicon-mysql-plain" />
    </span>
    <h4>SQL</h4>
  </div>
  {/* SKILL ITEM ENDS */}
  {/* SKILL ITEM STARTS */}
  <div className="animated-layer fade-in-up-animation fadeInRight wow">
    <span>
      <i className="devicon-bootstrap-plain" />
    </span>
    <h4>Bootstrap</h4>
  </div>
  {/* SKILL ITEM ENDS */}
</div>

<div>
  {/* SKILL ITEM STARTS */}
  <div className="animated-layer fade-in-down-animation fadeInLeft wow">
    <span>
      <i className="devicon-nodejs-plain" />
    </span>
    <h4>Node JS</h4>
  </div>
  {/* SKILL ITEM ENDS */}
  {/* SKILL ITEM STARTS */}
  <div className="animated-layer fade-in-up-animation fadeInRight wow">
    <span>
      <i className="devicon-tailwindcss-plain" />
    </span>
    <h4>Tailwind</h4>
  </div>
  {/* SKILL ITEM ENDS */}

          </div>
        </div>
      </div>
      {/* SKILLS ENDS */}
      {/* RESUME STARTS */}
      <div className="resume flex-column-mobile">
        {/* TITLE STARTS */}
        <div className="custom-title fadeInUp wow">
          {/* MAIN TITLE STARTS */}
          <h3>
            <span>
              <span className="animated-layer fade-in-left-animation">
                My Resume
              </span>
            </span>
          </h3>
          {/* MAIN TITLE ENDS */}
        </div>
        {/* TITLE ENDS */}
        {/* TIMELINE STARTS */}
        <div className="timeline">
          <ol className="animated-layer fade-in-animation">
            {/* TIMELINE ITEM STARTS */}
            <li>
              <div className="animated-layer fade-in-down-animation fadeInUp wow">
                <div className="experience">
                  <h4>Integrasi Pengolahan Diseminasi Statistika</h4>
                  <p>
                    <i className="fa-regular fa-clock" />
                    <span>2019 - 2020</span>
                  </p>
                  <p>
                    <i className="fa-regular fa-building" />
                    <span>Badan Pusat Statistik</span>
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="animated-layer fade-in-down-animation fadeInUp wow">
                <div className="experience">
                  <h4>Finshed Good</h4>
                  <p>
                    <i className="fa-regular fa-clock" />
                    <span>2020 - 2021</span>
                  </p>
                  <p>
                    <i className="fa-regular fa-building" />
                    <span>PT. Nippon Indosari Corpindo</span>
                  </p>
                </div>
              </div>
            </li>
            {/* TIMELINE ITEM ENDS */}
            {/* TIMELINE ITEM STARTS */}
            <li>
              <div className="animated-layer fade-in-up-animation fadeInUp wow">
                <div className="experience">
                  <h4>Petugas Sortir</h4>
                  <p>
                    <i className="fa-regular fa-clock" />
                    <span>2021 - 2022</span>
                  </p>
                  <p>
                    <i className="fa-regular fa-building" />
                    <span>PT. Kantor Pos Indonesia</span>
                  </p>
                </div>
              </div>
            </li>
            {/* TIMELINE ITEM ENDS */}
            {/* TIMELINE ITEM STARTS */}
            <li>
              <div className="animated-layer fade-in-down-animation fadeInUp wow">
                <div className="experience">
                  <h4>Customer Service</h4>
                  <p>
                    <i className="fa-regular fa-clock" />
                    <span>2022 - 2024</span>
                  </p>
                  <p>
                    <i className="fa-regular fa-building" />
                    <span>PT. Bank Central Asia</span>
                  </p>
                </div>
              </div>
            </li>
            {/* TIMELINE ITEM ENDS */}
            {/* TIMELINE ITEM STARTS */}
            {/* <li>
              <div className="animated-layer fade-in-up-animation fadeInUp wow">
                <div className="experience">
                  <h4>Chief Technology Officer</h4>
                  <p>
                    <i className="fa-regular fa-clock" />
                    <span>2019 - 2024</span>
                  </p>
                  <p>
                    <i className="fa-solid fa-building" />
                    <span>PT Banten Realti Indonesia</span>
                  </p>
                </div>
              </div>
            </li> */}
            {/* TIMELINE ITEM ENDS */}
            {/* TIMELINE ITEM STARTS */}
            <li>
              <div className="animated-layer fade-in-down-animation fadeInUp wow">
                <div className="experience">
                  <h4>Backend Developer</h4>
                  <p>
                    <i className="fa-regular fa-clock" />
                    <span>2021 - 2024</span>
                  </p>
                  <p>
                    <i className="fa-solid fa-building" />
                    <span>Dr.Chip</span>
                  </p>
                </div>
              </div>
            </li>
            {/* TIMELINE ITEM ENDS */}
            <li />
          </ol>
        </div>
        {/* TIMELINE ENDS */}
      </div>
      {/* RESUME ENDS */}
      <img
        alt=""
        className="separator hide-mobile"
        src="assets/separator.png"
      />
    </section>
  );
};
export default About;
