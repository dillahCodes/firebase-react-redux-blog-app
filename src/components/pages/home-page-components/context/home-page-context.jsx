import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const HomePageContext = createContext();

const initialState = {
  homePageArticleListByCategory: [],
  fetchStatus: { isLoading: false, isError: false },
  sliderCategorySelected: "untukmu",
};

const homePageReducer = (state, action) => {
  switch (action.type) {
    case "SET_SLIDER_CATEGORY_SELECTED":
      return { ...state, sliderCategorySelected: action.payload };
    case "SET_HOME_PAGE_ARTICLE_LIST_BY_CATEGORY":
      return { ...state, homePageArticleListByCategory: action.payload };
    case "SET_FETCH_STATUS":
      return { ...state, fetchStatus: action.payload };
    default:
      return state;
  }
};

const HomePageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  // console.log(state);
  return <HomePageContext.Provider value={{ state, dispatch }}>{children}</HomePageContext.Provider>;
};

HomePageContextProvider.propTypes = {
  children: PropTypes.node,
};

const useHomePageContext = () => {
  const context = useContext(HomePageContext);
  if (!context) throw new Error("useHomePageContext harus digunakan dalam HomePageContextProvider");
  return context;
};

export { HomePageContextProvider, useHomePageContext };
