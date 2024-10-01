import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import classNames from "classnames";
import PropTypes from "prop-types";
import { isBrowser, isMobile } from "react-device-detect";
import Headroom from "react-headroom";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import useDrawer from "../../../hooks/use-drawer";
import useHeader from "../../../hooks/use-header";
import { myThemeConfigs } from "../../../theme/antd-theme";
import PageDrawer from "../drawer";
import DrawerMenu from "../drawer/drawer-menu";
import PageHeader from "../header";
import SearchBarMobile from "../searchbar/searchbar-mobile";
import { useMemo } from "react";

const MainLayout = ({ children }) => {
  const { showHeader, hideHeader } = useHeader();
  const { screenWidth } = useDetectClientScreenWidth();
  const { isDrawerMenuOpen, isDrawerNotificationOpen, closeAllDrawer, drawerTitle } = useDrawer();

  const drawerWidth = useMemo(() => {
    if (screenWidth <= 500) return "100%";
    return "340px";
  }, [screenWidth]);

  return (
    <Layout
      className={classNames("max-w-[2000px] w-full  box-border mx-auto", {
        "min-w-[780px]": isBrowser,
        "min-w-[350px]": isMobile,
      })}
    >
      {/* page header */}
      <Headroom className={classNames("z-50 min-w-full")} onUnpin={hideHeader} onPin={showHeader}>
        <PageHeader />
      </Headroom>

      {/* page drawer */}
      <PageDrawer
        isOpen={isDrawerMenuOpen || isDrawerNotificationOpen}
        closeDrawer={() => closeAllDrawer()}
        style={myThemeConfigs.siderBorderStyle}
        title={<p className=" capitalize font-bold font-roboto-slab text-base m-0 text-center">{drawerTitle}</p>}
        width={drawerWidth}
      >
        <DrawerMenu />
      </PageDrawer>

      <Content className="min-h-screen">
        <SearchBarMobile />
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
