const Copyright = ({ profile }) => {
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
          <a target="_blank" href="">
            Avzl
          </a>
        </span>
        <ul></ul>
      </div>
    </section>
  );
};
export default Copyright;
