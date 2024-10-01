import { Avatar, Flex, Typography } from "antd";
import { myThemeConfigs } from "../../../theme/antd-theme";
import classNames from "classnames";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import PropTypes from "prop-types";
import { IoAccessibilityOutline, IoMailOutline } from "react-icons/io5";
import truncateString from "../../../utils/truncate-string";
import { AiOutlineIdcard } from "react-icons/ai";
import { MdOutlineInfo } from "react-icons/md";
import { useSelector } from "react-redux";

const { Title, Text, Paragraph } = Typography;
const UserEditInfoSection = () => {
  const { screenWidth } = useDetectClientScreenWidth();

  // user data by params id
  const edituserdata = useSelector((state) => state.editUser.userData);

  return (
    <main className="w-full h-full bg-[#b8e986] p-3 rounded-md" style={myThemeConfigs.siderBorderStyle}>
      <Title level={5} className="capitalize font-roboto-slab flex items-center gap-x-2">
        <span>
          <MdOutlineInfo />
        </span>
        info akun
      </Title>

      <div className="w-full mt-3 flex flex-col gap-y-5">
        <Flex wrap={screenWidth <= 462} gap={screenWidth <= 462 ? "small" : "large"} className="w-full">
          {/* avatar */}
          <AvatarUser />
          {/* account information */}
          <Flex vertical className="w-full ">
            {/* content information */}
            <Flex gap="middle" justify="space-between" className="w-full ">
              <UserInformation title="pengikut" count={edituserdata?.followers || 0} />
              <UserInformation title="mengikuti" count={edituserdata?.following || 0} />
              <UserInformation title="artikel" count={edituserdata?.articles || 0} />
            </Flex>
            {/* personal information */}
            <Flex
              vertical
              className={classNames({
                "mt-7": screenWidth <= 462,
                "mt-auto": screenWidth > 462,
              })}
              gap="small"
            >
              <UserPersonalInformation
                title="userId"
                copyValue={edituserdata?.user_id || "null"}
                value={edituserdata?.user_id || "null"}
                icon={<IoAccessibilityOutline />}
              />
              <UserPersonalInformation
                title="email"
                copyValue={edituserdata?.email || "null"}
                value={edituserdata?.email || "null"}
                icon={<IoMailOutline />}
              />
              <UserPersonalInformation
                title="role"
                copyValue={edituserdata?.role || "null"}
                value={edituserdata?.role || "null"}
                icon={<AiOutlineIdcard />}
              />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </main>
  );
};

export default UserEditInfoSection;

// user personal information
const UserPersonalInformation = ({ title, copyValue, value, icon }) => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <Text className="text-center font-roboto-slab after:content-[':'] after:absolute relative after:right-0  capitalize font-medium max-w-[80px] w-full flex items-center gap-x-1">
        <span>{icon}</span>
        <span>{title}</span>
      </Text>
      <Paragraph
        className="text-center font-roboto-slab mb-0"
        copyable={{
          text: copyValue,
        }}
      >
        {truncateString(value, 15)}
      </Paragraph>
    </div>
  );
};

UserPersonalInformation.propTypes = {
  title: PropTypes.string,
  copyValue: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.element,
};

// user content information
const UserInformation = ({ title, count }) => {
  return (
    <Flex vertical>
      <Text className="font-roboto-slab font-medium text-sm sm:text-base">{title}</Text>
      <Text className="font-roboto-slab font-medium text-sm sm:text-base text-center">{count}</Text>
    </Flex>
  );
};
UserInformation.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

const AvatarUser = () => {
  // user data by params id
  const user = useSelector((state) => state.editUser.userData);
  const { screenWidth } = useDetectClientScreenWidth();

  const profileImageAvatarSize = () => {
    if (screenWidth <= 500) {
      return 110;
    } else if (screenWidth <= 930) {
      return 120;
    } else {
      return 130;
    }
  };
  return (
    <Flex
      vertical
      align="center"
      gap="small"
      className={classNames("w-fit", {
        "mx-auto": screenWidth <= 462,
      })}
    >
      <Avatar
        className={classNames("mx-auto")}
        style={{
          backgroundColor: myThemeConfigs.token.colorText,
          color: myThemeConfigs.token.colorLinkHover,
          border: "1px solid black",
          boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)",
        }}
        srcSet={user?.photoUrl}
        src={user?.photoUrl}
        size={profileImageAvatarSize()}
      >
        {!user?.photoUrl && (
          <Text
            className={classNames(
              " transition-all text-2xl sm:text-3xl md:text-4xl text-[#dcfab6]    duration-300 capitalize font-roboto-slab "
            )}
          >
            {user?.name.charAt(0)}
          </Text>
        )}
      </Avatar>
      {/* username */}
      <Text className="font-special-elite text-sm mt-2 sm:text-base">{user?.name}</Text>
    </Flex>
  );
};
