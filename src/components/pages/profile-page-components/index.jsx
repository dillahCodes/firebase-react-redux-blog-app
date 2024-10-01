import classNames from "classnames";
import MainLayout from "../../layouts/main-layout";
import { Flex } from "antd";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import SectionUserInfo from "./section-user-info";
import SectionEditProfile from "./section-edit-profile";

const ProfilePageComponent = () => {
  const { screenWidth } = useDetectClientScreenWidth();

  return (
    <MainLayout>
      <Flex
        gap="middle"
        wrap={screenWidth <= 785}
        align="flex-start"
        className={classNames("mx-auto", {
          "max-w-screen-lg": screenWidth > 930,
          "max-w-[35rem]": screenWidth <= 784,
          "p-2 ": screenWidth < 400,
          "p-5 ": screenWidth >= 400,
        })}
      >
        <SectionUserInfo />
        <SectionEditProfile />
      </Flex>
    </MainLayout>
  );
};

export default ProfilePageComponent;
