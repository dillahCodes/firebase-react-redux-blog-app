import { message, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPostDataState, updateArticleId, updateIsPreviewPageActive } from "../post-data-slice";
import usePostArticle from "./use-post-article";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;
const useHandleFLoatingButtons = () => {
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const { handlePostArticle } = usePostArticle();
  const [isError, setIsError] = useState({
    isError: false,
    message: "",
  });
  const [messageApi, errorMessageContext] = message.useMessage();

  // dispatch and state parameters from useReducer tour-add-article-page-context in add article page
  const handleToggleFloatingButtons = (state, dispatch) => {
    const { isFloatingSendButtonActive } = state;
    dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: !isFloatingSendButtonActive });
  };

  // dispatch and state parameters from useReducer tour-add-article-page-context in add article page
  const handleOpenFloatingButtons = (dispatch) => {
    dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: true });
  };

  // dispatch and state parameters from useReducer tour-add-article-page-context in add article page
  const handleCloseFloatingButtons = (dispatch) => dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: false });

  // dispatch and state parameters from useReducer tour-add-article-page-context in add article page
  const handleFloatingButtonIsComingSoon = (dispatch) => {
    dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: false });
    messageApi.open({
      type: "info",
      content: <Text className="font-roboto-slab capitalize text-xs">coming soon</Text>,
    });
  };

  // dispatch and state parameters from useReducer tour-add-article-page-context in add article page
  const handleOpenTour = (dispatch) => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const checkIfAtTop = () => {
      if (window.scrollY === 0) {
        dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: false });
        dispatch({ type: "SET_IS_TOUR_ADD_ARTICLE_PAGE_ACTIVE", payload: true });
        window.removeEventListener("scroll", checkIfAtTop);
      }
    };

    if (window.scrollY === 0) {
      dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: false });
      dispatch({ type: "SET_IS_TOUR_ADD_ARTICLE_PAGE_ACTIVE", payload: true });
    } else {
      scrollToTop();
      window.addEventListener("scroll", checkIfAtTop);
    }
  };

  // dispatch and state parameters from useReducer tour-add-article-page-context in add article page
  const handleCloseTour = (dispatch) => dispatch({ type: "SET_IS_TOUR_ADD_ARTICLE_PAGE_ACTIVE", payload: false });

  // dispatch and state parameters from useReducer tour-add-article-page-context in add article page
  const handlePreviewPage = (dispatch) => {
    dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: false });
    dispatchRedux(updateIsPreviewPageActive(true));
  };

  // dispatch and state parameters from useReducer tour-add-article-page-context in add article page
  const handleClosePreviewPage = (dispatch) => {
    dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: false });
    dispatchRedux(updateIsPreviewPageActive(false));
  };

  const handleSendArticle = async () => {
    const result = await handlePostArticle();
    if (result.success) {
      messageApi.success({
        type: "success",
        content: <Text className="font-roboto-slab capitalize text-xs">{result.message}</Text>,
      });
      dispatchRedux(resetPostDataState());
      dispatchRedux(updateArticleId(uuidv4()));
      setTimeout(() => navigate("/artikelku"), 1000);
    } else {
      messageApi.error({
        type: "error",
        content: <Text className="font-roboto-slab capitalize text-xs">{result.message}</Text>,
      });
    }
  };

  return {
    // hande
    handleToggleFloatingButtons,
    handleOpenFloatingButtons,
    handleCloseFloatingButtons,

    // message
    errorMessageContext,
    isError,
    setIsError,

    // float button handler
    handleFloatingButtonIsComingSoon,
    handleCloseTour,
    handleOpenTour,
    handlePreviewPage,
    handleClosePreviewPage,
    handleSendArticle,
  };
};

export default useHandleFLoatingButtons;
