import { useCallback, useEffect, useState } from "react";
import { useEditArticlePage } from "../../../components/pages/edit-article-page-components/context/edit-article-page-context";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";
import { debounce } from "lodash";

const useEditorSuggestionArticleTags = () => {
  const { state, dispatch } = useEditArticlePage();
  const [dataTagsSuggestions, setDataTagsSuggestions] = useState({
    isLoading: false,
    isError: false,
    data: [],
  });
  const currentTagWord = state.article_current_tag_word;
  const isCurrentTagWordValid = currentTagWord.length >= 3 && currentTagWord.trim() !== "";

  // handle select tag suggestion
  const handleSelectTagSuggestion = (item) => {
    dispatch({ type: "SET_ARTICLE_CURRENT_TAG_WORD", payload: "" });

    if (state.article_tags.some((tag) => tag.topic_name.toLowerCase() === item.topic_name.toLowerCase())) {
      setDataTagsSuggestions({ isLoading: false, isError: null, data: [] });
      alert("tag sudah ada");
      return;
    } else if (state.article_tags.length === 5) {
      setDataTagsSuggestions({ isLoading: false, isError: null, data: [] });
      dispatch({ type: "SET_ARTICLE_CURRENT_TAG_WORD", payload: "" });
      alert("maksimal 5 topik artikel");
      return;
    } else {
      dispatch({ type: "SET_ARTICLE_CURRENT_TAG_WORD", payload: "" });
      setDataTagsSuggestions({ isLoading: false, isError: null, data: [] });

      const payload = {
        topic_id: uuidv4(),
        topic_name: item.topic_name,
      };
      dispatch({ type: "SET_ARTICLE_TAGS", payload: [...state.article_tags, payload] });
    }
  };

  // fetch data tags suggestion
  const handleDebounce = async (inputValue) => {
    try {
      setDataTagsSuggestions({ isLoading: true, isError: null, data: [] });
      const documentRef = query(
        collection(db, "topics-article"),
        where("topic_name", ">=", inputValue.toLowerCase()),
        where("topic_name", "<=", inputValue.toLowerCase() + "\uf8ff"),
        orderBy("topic_name", "asc"),
        limit(5)
      );
      const querySnapShot = await getDocs(documentRef);
      const fetchedData = querySnapShot.empty ? [] : querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
      setDataTagsSuggestions({ isLoading: false, isError: null, data: fetchedData });
    } catch (error) {
      console.error("error while get topics data", error.message);
      setDataTagsSuggestions({ isLoading: true, isError: null, data: [] });
    }
  };

  // debounce
  const debounceFn = useCallback(debounce(handleDebounce, 500), []); // eslint-disable-line

  // run when currentTagWord is valid
  useEffect(() => {
    isCurrentTagWordValid && debounceFn(currentTagWord);
  }, [isCurrentTagWordValid, debounceFn, currentTagWord]);

  return { dataTagsSuggestions, setDataTagsSuggestions, currentTagWord, handleSelectTagSuggestion };
};

export default useEditorSuggestionArticleTags;
