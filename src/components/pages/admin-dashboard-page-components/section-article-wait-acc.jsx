import { Content } from "antd/es/layout/layout";
import Breadcrumbs from "../../ui/breadcrumbs";
import MainLayout from "../../layouts/main-layout";
import classNames from "classnames";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import { Flex } from "antd";
import { useEffect } from "react";
import SiderAdmin from "../../layouts/sider/sider-admin";
import ArticleWaitAccTable from "./article-wait-acc-table";
import { PreviewAdminArticleContextProvider } from "./context/preview-article-context";

const SectionArticleWaitAcc = () => {
  const { screenWidth } = useDetectClientScreenWidth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <PreviewAdminArticleContextProvider>
      <MainLayout>
        <Flex align="flex-start" className="w-full">
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

            <div className="mt-5">
              <ArticleWaitAccTable />
            </div>
          </Content>
        </Flex>
      </MainLayout>
    </PreviewAdminArticleContextProvider>
  );
};

export default SectionArticleWaitAcc;
