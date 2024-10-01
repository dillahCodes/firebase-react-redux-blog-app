import { Content } from "antd/es/layout/layout";
import Breadcrumbs from "../../ui/breadcrumbs";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import MainLayout from "../../layouts/main-layout";
import { Flex } from "antd";
import classNames from "classnames";
import { useEffect } from "react";
import SiderAdmin from "../../layouts/sider/sider-admin";
import ComingSoonPage from "../../../pages/coming-soon-page";

const SectionDeleteArticle = () => {
  const { screenWidth } = useDetectClientScreenWidth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Flex align="flex-start" className="w-full min-h-screen">
        {screenWidth > 1120 && <SiderAdmin />}

        <Content
          className={classNames("w-full p-5  h-full overflow-y-auto", {
            "px-3": screenWidth <= 500,
          })}
        >
          {/* breadcrumb navigation */}
          <div className="w-full pl-1">
            <Breadcrumbs />
          </div>
          <ComingSoonPage />
        </Content>
      </Flex>
    </MainLayout>
  );
};

export default SectionDeleteArticle;
