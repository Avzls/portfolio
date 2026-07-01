import { asset } from "@/src/media";

const Facts = ({ facts }) => {
  const items = facts && facts.length ? facts : [];

  return (
    <section className="facts">
      <div className="flex-column-mobile">
        {items.map((fact, i) => (
          <div
            key={fact.id}
            className={`animated-layer fade-in-right-animation ${i % 2 === 0 ? "fadeInLeft" : "fadeInRight"} wow`}
            data-wow-offset={200}
          >
            <div>
              <div>
                <h3>{fact.number}</h3>
                <p>
                  {fact.label}
                  <span>{fact.highlight}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
        alt=""
        className="z-1 hide-mobile opposite-separator"
        src={asset("/assets/separator-opposite.png")}
      />
    </section>
  );
};
export default Facts;
