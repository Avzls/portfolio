import Head from "next/head";
import Header from "@/src/components/Header";
import ScrollBar from "@/src/components/ScrollBar";
import About from "@/src/components/sections/About";
import Clients from "@/src/components/sections/Clients";
import Contact from "@/src/components/sections/Contact";
import Copyright from "@/src/components/sections/Copyright";
import Facts from "@/src/components/sections/Facts";
import Home from "@/src/components/sections/Home";
import Portfolio from "@/src/components/sections/Portfolio";
import Separator from "@/src/components/Separator";

import { jqueryFuntion } from "@/src/utilits";
import { Fragment, useEffect } from "react";
import siteData from "@/src/data";

// Content is bundled at build time from the static data file, so the exported
// site needs no backend at runtime.
export function getStaticProps() {
  return { props: siteData };
}


const Index = ({ profile, skills, experiences, portfolios, socialLinks, settings, facts, clients, blogPosts }) => {

  useEffect(() => {
    jqueryFuntion();
  }, []);

  return (
    <Fragment>
      {settings?.site_title && (
        <Head>
          <title>{settings.site_title}</title>
        </Head>
      )}
      <div className="page-content">
        <Header settings={settings} />
        <div id="wrapper">
          <main className="flex-column-mobile">
            <Home profile={profile} settings={settings} />
            <About profile={profile} skills={skills} experiences={experiences} />
            <Facts facts={facts} />
            <Separator type={"down"} />
            <Separator type={"up"} />
            <Portfolio portfolios={portfolios} />
            <Clients clients={clients} />
            <Separator type={"down"} />
            <Separator type={"up"} />
            <Contact profile={profile} socialLinks={socialLinks} />
            <Separator type={"down"} />
            <Separator type={"up"} />
            <Copyright profile={profile} settings={settings} />

          </main>
        </div>
        <ScrollBar />
      </div>
    </Fragment>
  );
};
export default Index;


