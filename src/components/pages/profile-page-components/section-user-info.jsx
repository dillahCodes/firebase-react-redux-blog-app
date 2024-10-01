import classNames from "classnames";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import { Avatar, Layout, Tooltip, Typography } from "antd";
import useUser from "../../../features/auth/hooks/use-user";
import { RxPerson } from "react-icons/rx";
import { IoAccessibilityOutline, IoMailOutline } from "react-icons/io5";
import { AiOutlineIdcard } from "react-icons/ai";
import truncateString from "../../../utils/truncate-string";
import { myThemeConfigs } from "../../../theme/antd-theme";
import { MdOutlineInfo } from "react-icons/md";
import ButtonComponent from "../../ui/button-component";
import { RiLogoutBoxRLine } from "react-icons/ri";
import firebaseAuthServices from "../../../features/auth/firebase-auth-services";

const { Text, Paragraph, Title } = Typography;
const SectionUserInfo = () => {
  const { user } = useUser();
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

  const handleLogOut = () => firebaseAuthServices.logOut();

  return (
    <aside
      style={myThemeConfigs.siderBorderStyle}
      className={classNames("  rounded-md p-3 bg-[#b8e986]", {
        "max-w-xs w-full sticky top-0": screenWidth > 930,
        "max-w-[19rem] w-full sticky top-0": screenWidth <= 930 && screenWidth > 848,
        "max-w-[18rem] w-full ": screenWidth < 848 && screenWidth > 785,
        "w-full ": screenWidth <= 785,
      })}
    >
      <Layout className="w-full bg-transparent">
        <Title level={5} className="capitalize flex items-center gap-x-2 font-roboto-slab mb-3">
          <span className="text-lg">
            <MdOutlineInfo />
          </span>
          info akun
        </Title>

        {/* profile */}
        <div className="w-full flex justify-center items-center">
          <Avatar
            className={classNames("mx-auto")}
            style={{
              backgroundColor: myThemeConfigs.token.colorText,
              color: myThemeConfigs.token.colorLinkHover,
              border: "1px solid black",
              boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)",
            }}
            src={user?.photoURL}
            size={profileImageAvatarSize()}
          >
            {!user?.photoURL && (
              <Text
                className={classNames(
                  " transition-all text-2xl sm:text-3xl md:text-4xl text-[#dcfab6]    duration-300 capitalize font-roboto-slab "
                )}
              >
                {user?.displayName.charAt(0)}
              </Text>
            )}
          </Avatar>
        </div>

        <div className="max-w-md w-full  mx-auto ">
          {/* username section */}
          <div className="w-full flex items-center gap-x-2 my-1 mt-3 mx-auto">
            <Text className="text-center  after:content-[':'] after:absolute relative after:right-0 font-roboto-slab  capitalize font-medium max-w-[100px] w-full flex items-center gap-x-1">
              <span>
                <RxPerson />
              </span>
              <span>username</span>
            </Text>
            <Text className="text-center font-roboto-slab">{user?.displayName}</Text>
          </div>

          {/* user id section */}
          <div className="w-full flex items-center gap-x-2 mb-1">
            <Text className="text-center font-roboto-slab after:content-[':'] after:absolute relative after:right-0  capitalize font-medium max-w-[100px] w-full flex items-center gap-x-1">
              <span>
                <IoAccessibilityOutline />
              </span>
              <span>userId</span>
            </Text>
            <Paragraph
              className="text-center font-roboto-slab mb-0"
              copyable={{
                text: user?.uid,
              }}
            >
              {screenWidth >= 785 || screenWidth <= 430 ? truncateString(user?.uid, 12) : user?.uid}
            </Paragraph>
          </div>

          {/* email section */}
          <Tooltip
            trigger={["hover", "focus"]}
            title={
              <span className="text-xs">
                {user?.email} {user?.emailVerified ? "(verified ✅)" : "(not verified ❌)"}
              </span>
            }
          >
            <div className="w-full flex items-center gap-x-2 mb-1">
              <Text className="text-center font-roboto-slab after:content-[':'] after:absolute relative after:right-0  capitalize font-medium max-w-[100px] w-full flex items-center gap-x-1">
                <span>
                  <IoMailOutline />
                </span>
                <span>email</span>
              </Text>
              <Text className="text-center font-roboto-slab flex gap-x-1">
                {screenWidth >= 785 ? truncateString(user?.email, 12) : user?.email}
                <span>{user?.emailVerified ? "✅" : "❌"}</span>
              </Text>
            </div>
          </Tooltip>

          {/* role section */}
          <div className="w-full flex items-center gap-x-2">
            <Text className="text-center font-roboto-slab after:content-[':'] after:absolute relative after:right-0  capitalize font-medium max-w-[100px] w-full flex items-center gap-x-1">
              <span>
                <AiOutlineIdcard />
              </span>
              <span>role</span>
            </Text>
            <Text className="text-center font-roboto-slab">{user?.other_data?.role}</Text>
          </div>
        </div>

        <ButtonComponent
          onClick={handleLogOut}
          htmlType="submit"
          icon={<RiLogoutBoxRLine />}
          className=" bg-[#58942e] text-[#b8e986] flex items-center font-roboto-slab mt-3"
          type="primary"
        >
          keluar
        </ButtonComponent>
      </Layout>
    </aside>
  );
};

export default SectionUserInfo;
