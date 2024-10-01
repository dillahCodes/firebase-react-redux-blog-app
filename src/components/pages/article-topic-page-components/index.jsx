import { useEffect } from "react";
import { ArticleTopicPageContextProvider } from "./context/article-topic-page-context";
import SliderTopicPage from "./slider-topic-page";
import TitleTopicPage from "./title-topic-page";
import MainLayout from "../../layouts/main-layout";
import { Layout } from "antd";
import RecomendedArticleTopicPage from "./recomended-article-topic-page";

const ArticleTopicPageComponent = () => {
  // to top if component is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // TODO: make article topic page

  return (
    <ArticleTopicPageContextProvider>
      <MainLayout>
        <Layout className="max-w-screen-lg w-full mx-auto">
          <div className="w-full relative ">
            <SliderTopicPage />
            <TitleTopicPage />
            <RecomendedArticleTopicPage />
          </div>
        </Layout>
      </MainLayout>
    </ArticleTopicPageContextProvider>
  );
};

export default ArticleTopicPageComponent;
