const Copyright = ({ profile, settings }) => {
  const designerName = settings?.designer_name || "Avzl";
  const designerUrl = settings?.designer_url || "";
  return (
    <section className="copyright">
      <img
        alt=""
        className="z-1 hide-mobile"
        src="assets/separator-copyright.png"
      />
      <div>
        <span>© {new Date().getFullYear()} {profile?.name || "Alvin Malik"}</span>
        <span>
          Designed By{" "}
          <a target="_blank" rel="noopener noreferrer" href={designerUrl || "#"}>
            {designerName}
          </a>
        </span>
        <ul></ul>
      </div>
    </section>
  );
};

export default Copyright;
