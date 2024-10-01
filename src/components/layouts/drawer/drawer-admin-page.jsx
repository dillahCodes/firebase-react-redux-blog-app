import { useEffect } from "react";
import useDrawer from "../../../hooks/use-drawer";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import classNames from "classnames";
import { ConfigProvider, Layout } from "antd";
import SiderAdminMenu from "../sider/sider-admin-menu";

const DrawerAdminPage = () => {
  const { setDrawerTitle } = useDrawer();
  const { screenWidth } = useDetectClientScreenWidth();

  // set drawer title to "Menu Admin" when component mounts
  useEffect(() => {
    if (screenWidth < 1121) setDrawerTitle("Menu Admin");

    return () => setDrawerTitle("");
  }, [setDrawerTitle, screenWidth]);

  return (
    <Layout className={classNames("bg-transparent h-full p-3", {})}>
      <ConfigProvider wave={false}>
        <SiderAdminMenu />
      </ConfigProvider>
    </Layout>
  );
};

export default DrawerAdminPage;
