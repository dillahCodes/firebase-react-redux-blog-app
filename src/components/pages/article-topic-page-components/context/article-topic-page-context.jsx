import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const ArticleTopicPageContext = createContext();

const initialState = {
  selectedCategory: "",
  articleListByCategory: [],
  fetchStatus: { isLoading: false, isError: false },
};

const articleTopicPageReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_ARTICLE_LIST_BY_CATEGORY":
      return { ...state, articleListByCategory: action.payload };
    case "SET_FETCH_STATUS":
      return { ...state, fetchStatus: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ArticleTopicPageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(articleTopicPageReducer, initialState);
  return <ArticleTopicPageContext.Provider value={{ state, dispatch }}>{children}</ArticleTopicPageContext.Provider>;
};

ArticleTopicPageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useArticleTopicPageContext = () => {
  const context = useContext(ArticleTopicPageContext);
  if (context === undefined) throw new Error("useArticleTopicPageContext must be used within a ArticleTopicPageContextProvider");
  return context;
};

export { ArticleTopicPageContextProvider, useArticleTopicPageContext };
