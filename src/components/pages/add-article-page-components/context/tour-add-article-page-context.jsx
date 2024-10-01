import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const AddArticlePageTourContext = createContext();

const initialState = {
  isFloatingSendButtonActive: false,
  isTourAddArticlePageActive: true,
};

const addArticlePageTourReducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_FLOATING_SEND_BUTTON_ACTIVE":
      return {
        ...state,
        isFloatingSendButtonActive: action.payload,
      };

    case "SET_IS_TOUR_ADD_ARTICLE_PAGE_ACTIVE":
      return {
        ...state,
        isTourAddArticlePageActive: action.payload,
      };
    default:
      return state;
  }
};

const AddArticlePageTourProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addArticlePageTourReducer, initialState);
  return <AddArticlePageTourContext.Provider value={{ state, dispatch }}>{children}</AddArticlePageTourContext.Provider>;
};

AddArticlePageTourProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook untuk menggunakan context
const useAddArticlePageTour = () => {
  const context = useContext(AddArticlePageTourContext);
  if (!context) throw new Error("useAddArticlePageTour harus digunakan dalam AddArticlePageTourProvider");
  return context;
};

export { AddArticlePageTourProvider, useAddArticlePageTour };
