import Head from "next/head";
import { Fragment, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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
  const [color, setColor] = useState("yellow");
  const [toggle, setToggle] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Load the saved default theme from settings on mount.
  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then((r) => r.json())
      .then((s) => {
        if (s?.theme_color) setColor(s.theme_color);
      })
      .catch(() => {});

    if (typeof window !== "undefined") {
      setIsAdmin(!!localStorage.getItem("token"));
    }
  }, []);

  const selectColor = async (name) => {
    setColor(name);

    // Persist as default only when an admin is logged in.
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    try {
      await fetch(`${API_URL}/api/admin/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ theme_color: name }),
      });
      setSavedMsg("Saved!");
      setTimeout(() => setSavedMsg(""), 1500);
    } catch (e) {
      // ignore network errors in the demo switcher
    }
  };

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href={`css/skins/${color}.css`} />
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
                  <img
                    src={`assets/styleswitcher/${c.name}.png`}
                    alt={c.name}
                  />
                </a>
              </li>
            ))}
          </ul>
          {isAdmin && (
            <p style={{ fontSize: "11px", margin: "6px 0 0", opacity: 0.8 }}>
              {savedMsg || "Admin: pilihan tersimpan otomatis"}
            </p>
          )}
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
