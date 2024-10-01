import { myThemeConfigs } from "../../theme/antd-theme";
import PropTypes from "prop-types";

const DashboardFeaturesCard = ({ icon, mainText, subText }) => {
  return (
    <div
      //   key={i}
      className="w-full min-w-[200px] bg-[#b8e986] rounded-md p-3 flex items-center gap-x-3"
      style={myThemeConfigs.buttonBorderList}
    >
      {/* icon */}
      <div className="rounded-full w-[45px] h-[45px] text-4xl bg-[#dcfab6] flex items-center text-center">{icon}</div>

      {/* text */}
      <div className="w-fit">
        <p className="m-0 font-bold text-base font-roboto-slab">{mainText}</p>
        <p className="m-0 capitalize text-xs  font-roboto-slab">{subText}</p>
      </div>
    </div>
  );
};

export default DashboardFeaturesCard;

DashboardFeaturesCard.propTypes = {
  icon: PropTypes.node.isRequired,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
};
