import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase-services";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { debounce } from "lodash";
import {
  addTagSuggestionsToArticle,
  addTagToArticle,
  removeTagFromArticle,
  updateCurrentTagWord,
  updateTagSuggestions,
} from "../post-data-slice";

// Helper function to fetch topic data
const fetchTopicData = async (inputValue, setFetchTagStatus) => {
  if (inputValue.length < 3) {
    setFetchTagStatus({ isLoading: false, isError: null, data: [] });
    return;
  }

  const documentRef = query(
    collection(db, "topics-article"),
    where("topic_name", ">=", inputValue.toLowerCase()),
    where("topic_name", "<=", inputValue.toLowerCase() + "\uf8ff"),
    orderBy("topic_name", "asc"),
    limit(5)
  );

  setFetchTagStatus({ isLoading: true, isError: null, data: [] });

  try {
    const querySnapShot = await getDocs(documentRef);
    const fetchedData = querySnapShot.empty ? [] : querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));

    setFetchTagStatus({ isLoading: false, isError: null, data: fetchedData });
  } catch (error) {
    console.error("Error fetching topic data:", error);
    setFetchTagStatus({ isLoading: false, isError: error.message, data: [] });
  }
};

const useSetPostTags = () => {
  const dispatch = useDispatch();
  const { article_current_tag_word, article_tags, article_tags_suggestion } = useSelector((state) => state.postData);

  const [fetchTagStatus, setFetchTagStatus] = useState({
    isLoading: false,
    isError: null,
    data: [],
  });

  const [messageStatus, setMessageStatus] = useState({
    isMessageOpen: false,
    messageText: "",
  });

  const debounceFetchTopicData = useMemo(() => debounce((inputValue) => fetchTopicData(inputValue, setFetchTagStatus), 500), []);

  const handleUpdateCurrentTagWord = (e) => {
    const { value } = e.target;
    dispatch(updateCurrentTagWord(value));
    debounceFetchTopicData(value);
  };

  const handleAddTagToArticle = (e) => {
    if (e.key === "Enter" && article_current_tag_word.trim()) {
      if (article_tags.length === 5) {
        setMessageStatus({ isMessageOpen: true, messageText: "maksimal 5 topik artikel" });
        dispatch(updateCurrentTagWord(""));
        dispatch(updateTagSuggestions({ data: [], isLoading: false, isError: null }));
        return;
      } else if (article_tags.some((tag) => tag.topic_name === article_current_tag_word.trim().toLowerCase())) {
        setMessageStatus({ isMessageOpen: true, messageText: "tag sudah ada" });
        dispatch(updateCurrentTagWord(""));
        dispatch(updateTagSuggestions({ data: [], isLoading: false, isError: null }));
        return;
      }

      dispatch(addTagToArticle(article_current_tag_word.trim()));
      dispatch(updateCurrentTagWord(""));
    }
  };

  const handleRemoveTagFromArticle = (tagId) => dispatch(removeTagFromArticle(tagId));

  const handleAddTagSuggestionsToArticle = (tag) => {
    if (article_tags.some((tagValue) => tagValue.topic_id === tag.topic_id || tagValue.topic_name === tag.topic_name)) {
      setMessageStatus({ isMessageOpen: true, messageText: "tag sudah ada" });
      dispatch(updateCurrentTagWord(""));
      dispatch(updateTagSuggestions({ data: [], isLoading: false, isError: null }));
      return;
    } else if (article_tags.length === 5) {
      setMessageStatus({ isMessageOpen: true, messageText: "maksimal 5 topik artikel" });
      dispatch(updateCurrentTagWord(""));
      dispatch(updateTagSuggestions({ data: [], isLoading: false, isError: null }));
      return;
    }

    dispatch(addTagSuggestionsToArticle(tag));
    dispatch(updateCurrentTagWord(""));
    dispatch(updateTagSuggestions({ data: [], isLoading: false, isError: null }));
  };

  // update tag suggestion when article_current_tag_word changes
  useEffect(() => {
    dispatch(updateTagSuggestions(fetchTagStatus));
  }, [dispatch, fetchTagStatus]);

  // listen click outside to close tag suggestion
  useEffect(() => {
    const closeTagSuggestion = (e) => {
      e.target.id !== "tag-word-list-container" && dispatch(updateTagSuggestions({ data: [], isLoading: false, isError: null }));
    };

    document.addEventListener("click", closeTagSuggestion);
    return () => document.removeEventListener("click", closeTagSuggestion);
  }, [dispatch]);

  return {
    handleUpdateCurrentTagWord,
    handleAddTagToArticle,
    handleRemoveTagFromArticle,
    handleAddTagSuggestionsToArticle,
    article_current_tag_word,
    article_tags,
    article_tags_suggestion,
    messageStatus,
    setMessageStatus,
  };
};

export default useSetPostTags;
