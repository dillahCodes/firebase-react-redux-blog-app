import { useNavigate, useSearchParams } from "react-router-dom";
import { usePreviewAdminArticleContext } from "../../../components/pages/admin-dashboard-page-components/context/preview-article-context";

const useAdminPreviewArticle = () => {
  const [params, setSearchParams] = useSearchParams(); // eslint-disable-line
  const { state, dispatch } = usePreviewAdminArticleContext();
  const navigate = useNavigate();

  const handleAdminPreviewArticle = async (articleId) => {
    setSearchParams({ id: articleId }, { replace: false });
    navigate(`/dashboard-admin/persetujuan-artikel?id=${articleId}`, { replace: false });
    dispatch({ type: "SET_IS_ADMIN_PREVIEW_ARTICLE_ACTIVE", payload: true });
  };

  return { handleAdminPreviewArticle, state };
};

export default useAdminPreviewArticle;
