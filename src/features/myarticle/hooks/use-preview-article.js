import { useSearchParams } from "react-router-dom";
import { useMyArticlesPage } from "../../../components/pages/my-articles-page-components/context/my-articles-page-context";
import { useEffect } from "react";

const usePreviewArticle = () => {
  const { state, dispatch } = useMyArticlesPage();
  const [params, setParams] = useSearchParams();

  const handlePreviewArticle = (articleId) => {
    dispatch({ type: "SET_IS_PREVIEW_ARTICLE_ACTIVE", payload: true });
    dispatch({ type: "SET_PREVIEW_ARTICLE_DATA", payload: state.articleData.find((article) => article.doc_id === articleId) });
    setParams({ preview: true, articleId: articleId });
  };

  useEffect(() => {
    const handlePopState = () => {
      if (params.has("preview") || params.has("articleId")) {
        params.delete("preview");
        params.delete("articleId");
        setParams(params, { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [params, setParams]);

  return { handlePreviewArticle };
};

export default usePreviewArticle;
