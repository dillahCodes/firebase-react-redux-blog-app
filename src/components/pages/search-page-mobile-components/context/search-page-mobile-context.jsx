import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const SearchPageMobileContext = createContext();

const initialState = {
  searchResultList: [],
  fetchStatus: { isLoading: false, isError: false },
  searchInputValue: "",
};

const searchPageMobileReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULT_LIST":
      return { ...state, searchResultList: action.payload };
    case "SET_FETCH_STATUS":
      return { ...state, fetchStatus: action.payload };
    case "SET_SEARCH_INPUT_VALUE":
      return { ...state, searchInputValue: action.payload };
    default:
      return state;
  }
};

const SearchPageMobileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchPageMobileReducer, initialState);
  return <SearchPageMobileContext.Provider value={{ state, dispatch }}>{children}</SearchPageMobileContext.Provider>;
};

SearchPageMobileContextProvider.propTypes = {
  children: PropTypes.node,
};

const useSearchPageMobile = () => {
  const context = useContext(SearchPageMobileContext);
  if (context === undefined) throw new Error("useSearchPageMobile must be used within a SearchPageMobileContextProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { SearchPageMobileContextProvider, useSearchPageMobile };
