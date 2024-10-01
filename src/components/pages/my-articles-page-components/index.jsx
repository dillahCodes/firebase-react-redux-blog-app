import MainLayout from "../../layouts/main-layout";
import { Layout } from "antd";
import classNames from "classnames";
import { MyArticlesPageProvider } from "./context/my-articles-page-context";
import ListMyArticle from "./list-my-article";
import ListMyArticleHeader from "./list-my-article-header";
import { useSearchParams } from "react-router-dom";
import PreviewArticle from "./preview-article";

const MyArticlesPageComponents = () => {
  const [params] = useSearchParams();
  const isPreviewArticleActive = params.has("preview") || params.has("articleId");
  return (
    <MyArticlesPageProvider>
      <MainLayout>
        {isPreviewArticleActive ? (
          <Layout className={classNames("w-full max-w-screen-md mx-auto p-5 bg-transparent")}>
            <PreviewArticle />
          </Layout>
        ) : (
          <Layout className={classNames("w-full max-w-screen-xl mx-auto p-5 bg-transparent")}>
            <ListMyArticleHeader />
            <ListMyArticle />
          </Layout>
        )}
      </MainLayout>
    </MyArticlesPageProvider>
  );
};

export default MyArticlesPageComponents;
