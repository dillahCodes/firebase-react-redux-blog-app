import { Flex, Layout } from "antd";
import Breadcrumbs from "../../ui/breadcrumbs";
import { MdArticle, MdOutlinePendingActions, MdSupervisedUserCircle, MdTopic } from "react-icons/md";
import DashboardFeaturesCard from "../../ui/dashboard-features-card";
import MostPopularUsersTable from "./most-popular-users-table";
import classNames from "classnames";
import MainLayout from "../../layouts/main-layout";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import { useEffect } from "react";
import SiderAdmin from "../../layouts/sider/sider-admin";
import BarChartWithTitle from "../../layouts/chart/bar-chart-with-title";
import useDashboardFeaturesCard from "../../../features/admin/hooks/use-dashboard-features-card";
import useGetMostPopularTopics from "../../../features/admin/hooks/use-get-most-popular-topics";

const activeUser = [
  { month: "January", count: Math.floor(Math.random() * 100000) },
  { month: "February", count: Math.floor(Math.random() * 100000) },
  { month: "March", count: Math.floor(Math.random() * 100000) },
  { month: "April", count: Math.floor(Math.random() * 100000) },
  { month: "May", count: Math.floor(Math.random() * 100000) },
  { month: "June", count: Math.floor(Math.random() * 100000) },
  { month: "July", count: Math.floor(Math.random() * 100000) },
  { month: "August", count: Math.floor(Math.random() * 100000) },
  { month: "September", count: Math.floor(Math.random() * 100000) },
  { month: "October", count: Math.floor(Math.random() * 100000) },
  { month: "November", count: Math.floor(Math.random() * 100000) },
  { month: "December", count: Math.floor(Math.random() * 100000) },
];

const { Content } = Layout;
const AdminDashboardPageComponents = () => {
  const { screenWidth } = useDetectClientScreenWidth();
  const { topicsData } = useGetMostPopularTopics();
  const { totalUser, totalArticlesPending, totalArticlesAccepted, totalArticleTopics } = useDashboardFeaturesCard();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Flex align="flex-start" className=" w-full min-h-screen">
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
          {/* statistics card */}
          <div className="overflow-y-auto p-1 flex mt-5 items-center gap-x-5  no-scrollbar">
            <DashboardFeaturesCard
              icon={<MdSupervisedUserCircle className="mx-auto" />}
              mainText={`${totalUser}`}
              subText="total pengguna"
            />
            <DashboardFeaturesCard
              icon={<MdArticle className="mx-auto" />}
              mainText={`${totalArticlesAccepted}`}
              subText="artikel disetujui"
            />
            <DashboardFeaturesCard
              icon={<MdOutlinePendingActions className="mx-auto" />}
              mainText={`${totalArticlesPending}`}
              subText="pending artikel"
            />
            <DashboardFeaturesCard
              icon={<MdTopic className="mx-auto" />}
              mainText={`${totalArticleTopics}`}
              subText="total topik"
            />
          </div>
          {/* bar chart */}
          <div className="w-full flex items-center my-5  gap-5 px-1 flex-wrap">
            <BarChartWithTitle
              chartData={topicsData}
              chartDataKey="count"
              chartYAxisDataKey="count"
              chartXAxisDataKey="topic"
              title="topik terpopular"
            />
            <BarChartWithTitle
              chartData={activeUser}
              chartDataKey="count"
              chartYAxisDataKey="count"
              chartXAxisDataKey="month"
              title="pengguna aktif rata-rata"
            />
          </div>
          {/* most popular user */}
          <div className="px-1">
            <MostPopularUsersTable />
          </div>
        </Content>
      </Flex>
    </MainLayout>
  );
};

export default AdminDashboardPageComponents;
