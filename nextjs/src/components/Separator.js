import { asset } from "@/src/media";

const Separator = ({ type }) => {
  const src = asset("/assets/separator-mobile-up.png");
  return (
    <img
      alt=""
      className="separator-mobile-up hide-desktop z-1"
      src={src}
    />
  );
};
export default Separator;
