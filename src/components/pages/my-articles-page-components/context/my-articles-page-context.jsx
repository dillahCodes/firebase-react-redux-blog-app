import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

const MyArticlesPageContext = createContext();
const initialState = {
  articleData: [],
  tempArticleData: [],
  isPreviewArticle: false,
  previewArticleData: null,
};

const myArticlesPageReducer = (state, action) => {
  switch (action.type) {
    case "SET_ARTICLE_DATA":
      return {
        ...state,
        articleData: action.payload.articleData,
        tempArticleData: action.payload.tempArticleData,
      };
    case "RESET_FILTER_ALL_ARTICLE":
      return {
        ...state,
        articleData: state.tempArticleData,
      };
    case "FILTER_PENDING_ARTICLE":
      return {
        ...state,
        articleData: state.tempArticleData.filter((article) => article.reviewStatus === "pending"),
      };
    case "FILTER_ACCEPTED_ARTICLE":
      return {
        ...state,
        articleData: state.articleData.filter((article) => article.reviewStatus === "approved"),
      };
    case "FILTER_REJECTED_ARTICLE":
      return {
        ...state,
        articleData: state.articleData.filter((article) => article.reviewStatus === "rejected"),
      };
    case "SORT_ARTICLES_BY_NEWEST":
      return {
        ...state,
        articleData: state.articleData.sort((a, b) => {
          const timeA = a.updatedAt.seconds * 1000 + a.updatedAt.nanoseconds / 1000000;
          const timeB = b.updatedAt.seconds * 1000 + b.updatedAt.nanoseconds / 1000000;
          return timeB - timeA; // Sort by newest first
        }),
      };
    case "SORT_ARTICLES_BY_OLDEST":
      return {
        ...state,
        articleData: state.articleData.sort((a, b) => {
          const timeA = a.updatedAt.seconds * 1000 + a.updatedAt.nanoseconds / 1000000;
          const timeB = b.updatedAt.seconds * 1000 + b.updatedAt.nanoseconds / 1000000;
          return timeA - timeB; // Sort by oldest first
        }),
      };
    case "SEARCH_ARTICLE":
      return {
        ...state,
        articleData: state.articleData.filter((article) => article.title.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case "SET_IS_PREVIEW_ARTICLE_ACTIVE":
      return {
        ...state,
        isPreviewArticle: action.payload,
      };
    case "SET_PREVIEW_ARTICLE_DATA":
      return {
        ...state,
        previewArticleData: action.payload,
      };
    default:
      return state;
  }
};

const MyArticlesPageProvider = ({ children }) => {
  const [params, setParams] = useSearchParams();
  const [state, dispatch] = useReducer(myArticlesPageReducer, initialState);

  useEffect(() => {
    if (params.get("id")) setParams({}, { replace: false });
  }, [params, setParams]);

  return <MyArticlesPageContext.Provider value={{ state, dispatch }}>{children}</MyArticlesPageContext.Provider>;
};
MyArticlesPageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useMyArticlesPage = () => {
  const context = useContext(MyArticlesPageContext);
  if (!context) throw new Error("useMyArticlesPage harus digunakan dalam MyArticlesPageProvider");
  return context;
};

export { MyArticlesPageProvider, useMyArticlesPage };
