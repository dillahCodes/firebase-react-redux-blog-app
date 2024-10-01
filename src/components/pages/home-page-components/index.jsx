import { Flex, Layout } from "antd/es/index";
import classNames from "classnames";
import { isBrowser, isMobile } from "react-device-detect";
import useHeader from "../../../hooks/use-header";
import MainLayout from "../../layouts/main-layout";
import { HomePageContextProvider } from "./context/home-page-context";
import HomePageArticleList from "./home-page-article-list";
import HomePageSiderRecomendedPeople from "./home-page-sider-recomended-people";
import HomePageSiderRecomendedTopic from "./home-page-sider-recomended-topic";
import HomePageSliderCategories from "./home-page-slider-categories";
import HomePageHeroCarousel from "./home-page-hero-image";

const HomePageComponent = () => {
  const { isHeaderShown } = useHeader();

  return (
    <HomePageContextProvider>
      <MainLayout>
        <Layout
          className={classNames("w-full max-w-screen-xl mx-auto md:p-5 bg-transparent", {
            "p-5": isBrowser,
          })}
        >
          <Flex
            justify="space-between"
            align="flex-start"
            className={classNames("md:gap-5 bg-transparent", {
              "gap-5": isBrowser,
            })}
          >
            <section className="relative flex-grow w-3/5 p-1">
              <HomePageHeroCarousel />
              <div
                className={classNames("sticky z-[2] transition-all duration-300", {
                  "top-0": !isHeaderShown,
                  "top-16": isHeaderShown,
                })}
              >
                <HomePageSliderCategories />
              </div>
              <div className="px-1">
                <HomePageArticleList />
              </div>
            </section>

            <aside
              className={classNames(
                "sticky wf transition-all duration-300 top-0 h-screen overflow-y-auto p-1 no-scrollbar  w-2/5",
                {
                  "max-lg:hidden": isMobile,
                  "top-16": isHeaderShown,
                }
              )}
            >
              <Flex vertical gap="middle" className="w-full">
                <HomePageSiderRecomendedTopic />
                <HomePageSiderRecomendedPeople />
              </Flex>
            </aside>
          </Flex>
        </Layout>
      </MainLayout>
    </HomePageContextProvider>
  );
};

export default HomePageComponent;
