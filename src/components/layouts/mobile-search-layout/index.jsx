import { Flex, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import classNames from "classnames";
import PropTypes from "prop-types";
import { isBrowser, isMobile } from "react-device-detect";
import Headroom from "react-headroom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { myThemeConfigs } from "../../../theme/antd-theme";

const { Text } = Typography;
const MobileSearchLayout = ({ children }) => {
  return (
    <Layout
      className={classNames("max-w-[2000px] w-full  box-border mx-auto", {
        "min-w-[780px]": isBrowser,
        "min-w-[350px]": isMobile,
      })}
    >
      <Content className="min-h-screen max-w-screen-sm mx-auto w-full">
        <MobileSearchPageHeader />
        {children}
      </Content>
    </Layout>
  );
};

export default MobileSearchLayout;

MobileSearchLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const MobileSearchPageHeader = () => {
  const navigate = useNavigate();

  return (
    <Headroom className={classNames("z-50")}>
      <header
        className="  p-3 min-w-[320px] max-w-screen-sm mx-auto border-b border-black"
        style={{ backgroundColor: myThemeConfigs.components.Layout.headerBg }}
      >
        <Flex gap="small">
          <MdOutlineArrowBackIosNew className="cursor-pointer text-lg font-light opacity-[.7]" onClick={() => navigate(-1)} />
          <Text className="font-bold font-roboto-slab text-sm m-0 capitalize">cari artikel</Text>
        </Flex>
      </header>
    </Headroom>
  );
};
