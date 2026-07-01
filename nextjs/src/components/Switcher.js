import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { asset } from "@/src/media";
import { settings as siteSettings } from "@/src/data";

const colors = [
  { id: 1, name: "yellow" },
  { id: 2, name: "green" },
  { id: 3, name: "red" },
  { id: 4, name: "blue" },
  { id: 5, name: "orange" },
  { id: 6, name: "yellowgreen" },
  { id: 7, name: "pink" },
  { id: 8, name: "goldenrod" },
];

const Switcher = () => {
  const [color, setColor] = useState(siteSettings.theme_color || "yellow");
  const [toggle, setToggle] = useState(false);

  // Remember the visitor's chosen theme locally (no backend needed).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme_color");
    if (saved) setColor(saved);
  }, []);

  const selectColor = (name) => {
    setColor(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme_color", name);
    }
  };

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href={asset(`/css/skins/${color}.css`)} />
      </Head>
      <div
        id="switcher"
        className={toggle ? "open" : "close"}
        style={{ display: "block" }}
      >
        <div className="content-switcher">
          <h4>COLOR SWITCHER</h4>
          <ul>
            {colors.map((c) => (
              <li key={c.id}>
                <a
                  href="#"
                  title={c.name}
                  className="color"
                  onClick={(e) => {
                    e.preventDefault();
                    selectColor(c.name);
                  }}
                >
                  <img src={asset(`/assets/styleswitcher/${c.name}.png`)} alt={c.name} />
                </a>
              </li>
            ))}
          </ul>
          <div id="hideSwitcher" onClick={() => setToggle(false)}>
            ×
          </div>
        </div>
      </div>
      <div
        id="showSwitcher"
        className={`styleSecondColor ${toggle ? "close" : "open"}`}
        onClick={() => setToggle(true)}
      >
        <i className="fa fa-cog" />
      </div>
    </Fragment>
  );
};
export default Switcher;
