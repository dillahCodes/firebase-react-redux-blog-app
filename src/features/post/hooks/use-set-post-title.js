import { useDispatch, useSelector } from "react-redux";
import { updateArticleTitle } from "../post-data-slice";

const useSetPostTitle = () => {
  const dispatch = useDispatch();
  const { article_title } = useSelector((state) => state.postData);

  const handleUpdateArticleTitle = (event) => {
    const { value } = event.target;
    dispatch(updateArticleTitle(value));
  };

  return { handleUpdateArticleTitle, article_title };
};

export default useSetPostTitle;
