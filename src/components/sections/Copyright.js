const Copyright = () => {
  return (
    <section className="copyright">
      <img
        alt=""
        className="z-1 hide-mobile"
        src="assets/separator-copyright.png"
      />
      <div>
        <span>© {new Date().getFullYear()} Alvin Malik</span>
        <span>
          Designed By{" "}
          <a
            target="_blank"
            href=""
          >
            Avzl
          </a>
        </span>
        <ul>
          {/* <li>
          <a href="assets/alvin.pdf" download>
              <i className="fas fa-download" />
            </a>
          </li> */}
          {/* <li>
            <a href="#">
              <i className="fa-brands fa-twitter" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook" />
            </a>
          </li> */}
        </ul>
      </div>
    </section>
  );
};
export default Copyright;
