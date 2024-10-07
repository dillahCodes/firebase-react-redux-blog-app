import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-services";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";

const EditArticlePageContext = createContext();
const initialState = {
  article_id: "",
  article_title: "",

  article_tags: [],
  article_current_tag_word: "",

  main_image_content_url: "",
  main_image_content: null,

  article_content: "",
  article_content_json: null,

  fetch_status: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
};

const editArticlePageReducer = (state, action) => {
  switch (action.type) {
    case "SET_ARTICLE_ID":
      return { ...state, article_id: action.payload };
    case "SET_ARTICLE_TITLE":
      return { ...state, article_title: action.payload };
    case "SET_ARTICLE_TAGS":
      return { ...state, article_tags: action.payload };
    case "SET_ARTICLE_CURRENT_TAG_WORD":
      return { ...state, article_current_tag_word: action.payload };
    case "SET_ARTICLE_CONTENT":
      return { ...state, article_content: action.payload };
    case "SET_ARTICLE_CONTENT_JSON":
      return { ...state, article_content_json: action.payload };
    case "SET_MAIN_IMAGE_CONTENT_URL":
      return { ...state, main_image_content_url: action.payload };
    case "SET_MAIN_IMAGE_CONTENT":
      return { ...state, main_image_content: action.payload };
    case "SET_FETCH_STATUS":
      return { ...state, fetch_status: action.payload };
    default:
      return state;
  }
};

const handleGetArticleByDocId = async (articleDocId) => {
  try {
    const docRef = doc(db, "articles", articleDocId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "Artikel tidak ditemukan",
        data: null,
      };
    }
  } catch (error) {
    console.error("error while getting article by doc id", error);
    return {
      success: false,
      message: "kesalahan saat mengambil artikel, silahkan coba lagi",
      data: null,
    };
  }
};

const EditArticlePageProvider = ({ children }) => {
  const navigate = useNavigate();
  const [messageApi, messageApiContextHolder] = message.useMessage();
  const [state, dispatch] = useReducer(editArticlePageReducer, initialState);
  const [params] = useSearchParams();

  const showErrorAndRedirect = useCallback(
    (message) => {
      messageApi.open({
        type: "error",
        content: message,
      });
      setTimeout(() => {
        navigate("/artikelku", { replace: true });
      }, 2000);
    },
    [messageApi, navigate]
  );

  useEffect(() => {
    const articleDocId = params.get("id");
    if (articleDocId) {
      dispatch({ type: "SET_FETCH_STATUS", payload: { isLoading: true, isError: false } });
      handleGetArticleByDocId(articleDocId).then((res) => {
        if (res.success) {
          const resultData = JSON.parse(JSON.stringify(res.data));
          const { id, title, mainImage, topicNames, content, contentJson } = resultData;
          const topicNamesMap = topicNames.map((item) => ({
            topic_id: uuidv4(),
            topic_name: item,
          }));
          dispatch({ type: "SET_ARTICLE_ID", payload: id });
          dispatch({ type: "SET_ARTICLE_TITLE", payload: title });
          dispatch({ type: "SET_MAIN_IMAGE_CONTENT_URL", payload: mainImage });
          dispatch({ type: "SET_ARTICLE_TAGS", payload: topicNamesMap });
          dispatch({ type: "SET_ARTICLE_CONTENT", payload: content });
          dispatch({ type: "SET_ARTICLE_CONTENT_JSON", payload: contentJson });
          dispatch({ type: "SET_FETCH_STATUS", payload: { isLoading: false, isError: false, isSuccess: true } });
        } else {
          dispatch({ type: "SET_FETCH_STATUS", payload: { isLoading: false, isError: true, isSuccess: false } });
          showErrorAndRedirect(res.message);
        }
      });
    } else {
      navigate("/artikelku", { replace: true });
    }
  }, [params, navigate, showErrorAndRedirect]);

  return (
    <EditArticlePageContext.Provider value={{ state, dispatch }}>
      {messageApiContextHolder}
      {children}
    </EditArticlePageContext.Provider>
  );
};

EditArticlePageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useEditArticlePage = () => {
  const context = useContext(EditArticlePageContext);
  if (!context) throw new Error("useEditArticlePage must be used within a EditArticlePageProvider");
  return context;
};

export { EditArticlePageProvider, useEditArticlePage };
