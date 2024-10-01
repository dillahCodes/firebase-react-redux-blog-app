import { myThemeConfigs } from "../../../theme/antd-theme";

import { ConfigProvider, Typography } from "antd";
import ButtonComponent from "../../ui/button-component";
import HomePageSiderAdminArticleComponent from "./home-page-sider-admin-article-component";
import classNames from "classnames";
import { isMobile } from "react-device-detect";
const { Title } = Typography;

const HomePageSiderAdminArticle = () => {
  return (
    <div
      style={myThemeConfigs.siderBorderStyle}
      className={classNames(
        "  min-h-[400px] w-full border-2 flex flex-col justify-between  border-black rounded-md overflow-hidden",
        {
          "w-full": isMobile,
        }
      )}
    >
      <Title level={2} className="p-3 bg-[#b8e986] border-b-2 text-base border-black capitalize font-special-elite">
        oleh admin
      </Title>
      <div className="w-full p-3 flex flex-col gap-y-2 h-[280px] overflow-y-auto scrollbar-custom">
        {Array.from({ length: 10 }, (_, i) => (
          <HomePageSiderAdminArticleComponent key={i} />
        ))}
      </div>
      <ConfigProvider wave={{ disabled: true }}>
        <ButtonComponent
          type="primary"
          className="w-full capitalize cursor-pointer font-special-elite p-3 py-2  border-t-2 border-black rounded-none border-l-0 border-r-0 border-b-0"
        >
          lihat semua artikel
        </ButtonComponent>
      </ConfigProvider>
    </div>
  );
};

export default HomePageSiderAdminArticle;
