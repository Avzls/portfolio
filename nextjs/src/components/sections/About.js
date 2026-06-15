import { resolveMedia } from "@/src/media";

const About = ({ profile, skills, experiences }) => {

  const nameParts = (profile?.name || "Alvin Malik").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <section className="about main-section flex-column-mobile" id="about">
      {/* INFO HOLDER */}
      <div className="info flex-column-mobile">
        {/* IMAGE */}
        <div
          className="img-container animated-layer image-animation my-photo-container fadeInUp wow"
          data-wow-offset={200}
          id="my-photo"
        >
          <div>
            <div>
              <img className="my-photo" src={profile?.photo_url ? resolveMedia(profile.photo_url) : "assets/pasfoto.jpg"} alt={profile?.name} />

            </div>
          </div>
        </div>
        {/* INFO */}
        <div>
          <h2>
            <span>
              <span className="animated-layer fade-in-up-animation fadeInUp wow">
                {firstName}
              </span>
            </span>
            <span>
              <span className="animated-layer fade-in-up-animation fadeInUp wow">
                {lastName}
              </span>
            </span>
          </h2>
          <div className="infos">
            <ul>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Age :</span>
                    <span>{profile?.age || ""}</span>
                  </span>
                </span>
              </li>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Education :</span>
                    <span>{profile?.education || ""}</span>
                  </span>
                </span>
              </li>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Langages :</span>
                    <span>{profile?.languages || ""}</span>
                  </span>
                </span>
              </li>
            </ul>
            <ul>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Address :</span>
                    <span>{profile?.address || ""}</span>
                  </span>
                </span>
              </li>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Phone :</span>
                    <span>{profile?.phone || ""}</span>
                  </span>
                </span>
              </li>
              <li>
                <span>
                  <span className="animated-layer fade-in-up-animation fadeInUp wow">
                    <span>Email :</span>
                    <span>{profile?.email || ""}</span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <div className="download-cv-button">
            <a href={profile?.cv_url ? resolveMedia(profile.cv_url) : "#"} download>
              Download CV
            </a>

          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div className="skills flex-column-mobile">
        <div className="custom-title">
          <h3>
            <span>
              <span className="animated-layer fade-in-left-animation fadeInUp wow">
                My Skills
              </span>
            </span>
          </h3>
        </div>
        <div className="skills-content">
          {/* Render skills in pairs */}
          {Array.from({ length: Math.ceil((skills || []).length / 2) }, (_, i) => {
            const left = skills[i * 2];
            const right = skills[i * 2 + 1];
            return (
              <div key={i}>
                {left && (
                  <div className="animated-layer fade-in-down-animation fadeInLeft wow">
                    <span>
                      <i className={left.icon_class} />
                    </span>
                    <h4>{left.name}</h4>
                  </div>
                )}
                {right && (
                  <div className="animated-layer fade-in-up-animation fadeInRight wow">
                    <span>
                      <i className={right.icon_class} />
                    </span>
                    <h4>{right.name}</h4>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RESUME */}
      <div className="resume flex-column-mobile">
        <div className="custom-title fadeInUp wow">
          <h3>
            <span>
              <span className="animated-layer fade-in-left-animation">
                My Resume
              </span>
            </span>
          </h3>
        </div>
        <div className="timeline">
          <ol className="animated-layer fade-in-animation">
            {(experiences || []).map((exp, idx) => (
              <li key={exp.id}>
                <div className={`animated-layer ${idx % 2 === 0 ? "fade-in-down-animation" : "fade-in-up-animation"} fadeInUp wow`}>
                  <div className="experience">
                    <h4>{exp.title}</h4>
                    <p>
                      <i className="fa-regular fa-clock" />
                      <span>{exp.period}</span>
                    </p>
                    <p>
                      <i className="fa-regular fa-building" />
                      <span>{exp.company}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
            <li />
          </ol>
        </div>
      </div>

      <img alt="" className="separator hide-mobile" src="assets/separator.png" />
    </section>
  );
};
export default About;
