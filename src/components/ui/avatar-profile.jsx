import { Avatar, Typography } from "antd";
import { myThemeConfigs } from "../../theme/antd-theme";
import PropTypes from "prop-types";

const { Text } = Typography;
const AvatarProfile = ({ userName, photoURL, size = 40, ...props }) => {
  return (
    <Avatar
      {...props}
      className="m-1"
      style={{
        cursor: "pointer",
        backgroundColor: myThemeConfigs.token.colorText,
        color: myThemeConfigs.token.colorLinkHover,
        border: "1px solid black",
        boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)",
      }}
      src={photoURL || null}
      size={size}
    >
      {!photoURL && (
        <Text className=" transition-all text-[#dcfab6] text-lg  duration-300 capitalize font-roboto-slab ">
          {userName?.charAt(0)}
        </Text>
      )}
    </Avatar>
  );
};

export default AvatarProfile;

AvatarProfile.propTypes = {
  userName: PropTypes.string,
  photoURL: PropTypes.string,
  size: PropTypes.number,
};
