import Head from "next/head";
import Header from "@/src/components/Header";
import ScrollBar from "@/src/components/ScrollBar";
import About from "@/src/components/sections/About";
import Blog from "@/src/components/sections/Blog";
import Clients from "@/src/components/sections/Clients";
import Contact from "@/src/components/sections/Contact";
import Copyright from "@/src/components/sections/Copyright";
import Facts from "@/src/components/sections/Facts";
import Home from "@/src/components/sections/Home";
import Portfolio from "@/src/components/sections/Portfolio";
import Separator from "@/src/components/Separator";

import { jqueryFuntion } from "@/src/utilits";
import { Fragment, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Fetch a single endpoint and parse JSON safely. If the endpoint is missing
// (e.g. backend not restarted yet) or returns non-JSON, fall back gracefully
// instead of crashing the whole page.
async function fetchJson(path, fallback) {
  try {
    const res = await fetch(`${API_URL}${path}`);
    if (!res.ok) return fallback;
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error(`Non-JSON response from ${path}:`, text.slice(0, 80));
      return fallback;
    }
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error.message);
    return fallback;
  }
}

export async function getServerSideProps() {
  const [profile, skills, experiences, portfolios, socialLinks, settings, facts, clients, blogPosts] = await Promise.all([
    fetchJson("/api/profile", {}),
    fetchJson("/api/skills", []),
    fetchJson("/api/experiences", []),
    fetchJson("/api/portfolios", []),
    fetchJson("/api/social-links", []),
    fetchJson("/api/settings", {}),
    fetchJson("/api/facts", []),
    fetchJson("/api/clients", []),
    fetchJson("/api/blog-posts", []),
  ]);

  return { props: { profile, skills, experiences, portfolios, socialLinks, settings, facts, clients, blogPosts } };
}


const Index = ({ profile, skills, experiences, portfolios, socialLinks, settings, facts, clients, blogPosts }) => {

  useEffect(() => {
    jqueryFuntion();
  });

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
            <Blog posts={blogPosts} />
            <Separator type={"down"} />
            <Copyright profile={profile} settings={settings} />

          </main>
        </div>
        <ScrollBar />
      </div>
    </Fragment>
  );
};
export default Index;


