import { Link, useLocation } from "react-router-dom";
import { RxSlash } from "react-icons/rx";

const Breadcrumbs = () => {
  const location = useLocation();

  const locationList = location.pathname.split("/").filter((locationPath) => locationPath !== "");
  const deleteHyphenInString = (str) => str.replace(/-/g, " ");

  return (
    <div className="w-full  flex items-center">
      {locationList.map((locationPath, index) => (
        <Link
          key={index}
          className="hover:text-[#b8e986] flex items-center capitalize font-roboto-slab"
          to={`/${locationList.slice(0, index + 1).join("/")}`}
        >
          {index !== 0 && <RxSlash className="text-[#58942e] mx-1 text-base" />}
          <span>{deleteHyphenInString(locationPath)}</span>
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
