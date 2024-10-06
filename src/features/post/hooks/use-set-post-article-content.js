import { useDispatch, useSelector } from "react-redux";
import { updateArticleContent, updateArticleContentJson } from "../post-data-slice";

const useSetPostArticleContent = () => {
  const dispatch = useDispatch();
  const { article_content, article_content_json } = useSelector((state) => state.postData);
  const handleUpdateArticleContent = (content) => dispatch(updateArticleContent(content));
  const handleUpdateArticleContentJson = (content) => dispatch(updateArticleContentJson(content));

  // console.log(article_content, article_content_json);

  return { article_content, handleUpdateArticleContent, handleUpdateArticleContentJson, article_content_json };
};

export default useSetPostArticleContent;
