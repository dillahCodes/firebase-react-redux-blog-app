import { useDispatch, useSelector } from "react-redux";
import { updateArticleContent } from "../post-data-slice";

const useSetPostArticleContent = () => {
  const dispatch = useDispatch();
  const { article_content } = useSelector((state) => state.postData);
  const handleUpdateArticleContent = (content) => dispatch(updateArticleContent(content));

  return { article_content, handleUpdateArticleContent };
};

export default useSetPostArticleContent;
