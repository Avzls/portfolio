import Head from "next/head";
import { asset } from "@/src/media";

const SalimovHead = () => {
  return (
    <Head>
      <title>Alvin Malik Portfolio</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href={asset("/favicon.svg")} />

      {/* Template Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Livvic:wght@100;200;300;400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Template CSS Files */}
      <link rel="stylesheet" href={asset("/css/devicon.min.css")} />
      <link rel="stylesheet" href={asset("/css/all.min.css")} />
      <link rel="stylesheet" href={asset("/css/bootstrap.min.css")} />
      <link rel="stylesheet" href={asset("/css/swiper-bundle.min.css")} />
      <link rel="stylesheet" href={asset("/css/animate.min.css")} />
      <link rel="stylesheet" href={asset("/css/jquery.mCustomScrollbar.min.css")} />
      <link rel="stylesheet" href={asset("/css/style.css")} />
      {/* Live Style Switcher - demo only */}
      <link rel="stylesheet" type="text/css" href={asset("/css/styleswitcher.css")} />
    </Head>
  );
};
export default SalimovHead;
