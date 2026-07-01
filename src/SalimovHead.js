import Head from "next/head";

// Public site URL (used for canonical + absolute social-share image URLs).
const SITE_URL = "https://avzls.github.io/portfolio";
const TITLE = "Alvin Malik — Web & Backend Developer";
const DESCRIPTION =
  "Portfolio of Alvin Malik, a web & backend developer specializing in Laravel, Next.js, and React. Explore projects, skills, and experience.";
const OG_IMAGE = `${SITE_URL}/assets/pasfoto.jpg`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alvin Malik",
  url: SITE_URL,
  image: OG_IMAGE,
  jobTitle: "Web & Backend Developer",
  address: { "@type": "PostalAddress", addressLocality: "Serang", addressRegion: "Banten", addressCountry: "ID" },
  email: "mailto:alvinmalik1111@gmail.com",
  knowsAbout: ["PHP", "Laravel", "React", "Next.js", "Node.js", "MySQL", "Tailwind CSS", "Bootstrap"],
  sameAs: [
    "https://github.com/Avzls",
    "https://www.instagram.com/avzl_/",
    "https://www.facebook.com/AlviNaomi/",
  ],
};

const SalimovHead = () => {
  return (
    <Head>
      {/* Primary */}
      <title>{TITLE}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={DESCRIPTION} />
      <meta
        name="keywords"
        content="Alvin Malik, web developer, backend developer, Laravel, Next.js, React, Node.js, portfolio, Serang, Banten, Indonesia"
      />
      <meta name="author" content="Alvin Malik" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#111111" />
      <link rel="canonical" href={`${SITE_URL}/`} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      <link rel="apple-touch-icon" href="favicon.svg" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Alvin Malik Portfolio" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Template Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Livvic:wght@100;200;300;400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Template CSS Files */}
      <link rel="stylesheet" href="css/devicon.min.css" />
      <link rel="stylesheet" href="css/all.min.css" />
      <link rel="stylesheet" href="css/bootstrap.min.css" />
      <link rel="stylesheet" href="css/swiper-bundle.min.css" />
      <link rel="stylesheet" href="css/animate.min.css" />
      <link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css" />
      <link rel="stylesheet" href="css/style.css" />
      <link rel="stylesheet" type="text/css" href="css/styleswitcher.css" />
    </Head>
  );
};
export default SalimovHead;
