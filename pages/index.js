import Header from "@/src/components/Header";
import ScrollBar from "@/src/components/ScrollBar";
import About from "@/src/components/sections/About";
import Contact from "@/src/components/sections/Contact";
import Copyright from "@/src/components/sections/Copyright";
import Home from "@/src/components/sections/Home";
import Portfolio from "@/src/components/sections/Portfolio";
import Separator from "@/src/components/Separator";
import { jqueryFuntion } from "@/src/utilits";
import { Fragment, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getServerSideProps() {
  try {
    const [profileRes, skillsRes, experiencesRes, portfoliosRes, socialLinksRes] = await Promise.all([
      fetch(`${API_URL}/api/profile`),
      fetch(`${API_URL}/api/skills`),
      fetch(`${API_URL}/api/experiences`),
      fetch(`${API_URL}/api/portfolios`),
      fetch(`${API_URL}/api/social-links`),
    ]);

    const profile = await profileRes.json();
    const skills = await skillsRes.json();
    const experiences = await experiencesRes.json();
    const portfolios = await portfoliosRes.json();
    const socialLinks = await socialLinksRes.json();

    return { props: { profile, skills, experiences, portfolios, socialLinks } };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { props: { profile: {}, skills: [], experiences: [], portfolios: [], socialLinks: [] } };
  }
}

const Index = ({ profile, skills, experiences, portfolios, socialLinks }) => {
  useEffect(() => {
    jqueryFuntion();
  });

  return (
    <Fragment>
      <div className="page-content">
        <Header />
        <div id="wrapper">
          <main className="flex-column-mobile">
            <Home profile={profile} />
            <About profile={profile} skills={skills} experiences={experiences} />
            <Separator type={"down"} />
            <Separator type={"up"} />
            <Portfolio portfolios={portfolios} />
            <Separator type={"down"} />
            <Separator type={"up"} />
            <Contact profile={profile} socialLinks={socialLinks} />
            <Separator type={"down"} />
            <Copyright profile={profile} />
          </main>
        </div>
        <ScrollBar />
      </div>
    </Fragment>
  );
};
export default Index;
