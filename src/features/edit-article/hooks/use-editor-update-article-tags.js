import { useEditArticlePage } from "../../../components/pages/edit-article-page-components/context/edit-article-page-context";
import { v4 as uuidv4 } from "uuid";

const useEditorUpdateArticleTags = () => {
  const { state, dispatch } = useEditArticlePage();

  //   this function for handle input tag change
  const handleInputTagChange = (e) => {
    const { value } = e.target;
    dispatch({ type: "SET_ARTICLE_CURRENT_TAG_WORD", payload: value });
  };

  //   this function for handle key down on input tag
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (state.article_tags.some((tag) => tag.topic_name.toLowerCase() === state.article_current_tag_word.toLowerCase())) {
        dispatch({ type: "SET_ARTICLE_CURRENT_TAG_WORD", payload: "" });
        alert("tag sudah ada");
        return;
      }

      if (state.article_tags.length === 5) {
        dispatch({ type: "SET_ARTICLE_CURRENT_TAG_WORD", payload: "" });
        alert("maksimal 5 topik artikel");
        return;
      }

      e.preventDefault();
      const payload = {
        topic_id: uuidv4(),
        topic_name: state.article_current_tag_word,
      };
      dispatch({ type: "SET_ARTICLE_TAGS", payload: [...state.article_tags, payload] });
      dispatch({ type: "SET_ARTICLE_CURRENT_TAG_WORD", payload: "" });
    }
  };

  //   this function for handle remove tag from article
  const handleRemoveTagFromArticle = (tag_id) => {
    const result = state?.articleTags.filter((tag) => tag.topic_id !== tag_id);
    dispatch({ type: "SET_ARTICLE_TAGS", payload: result });
  };

  return { handleInputTagChange, handleKeyDown, handleRemoveTagFromArticle };
};

export default useEditorUpdateArticleTags;
