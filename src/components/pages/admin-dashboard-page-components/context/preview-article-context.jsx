import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-services";
import useGetUserPhotoUrl from "../../../../features/auth/hooks/use-get-user-role";

// Initial state
const initialState = {
  is_admin_preview_article_active: false,
  set_author_data: {
    uid: "",
    display_name: "",
    email: "",
    avatar_url: "",
  },
  article_id: "",
  article_title: "",
  article_tags: [],
  main_image_content_url: "",
  article_content: "",
};

// Reducer function
const previewAdminArticleReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTHOR_DATA":
      return { ...state, set_author_data: action.payload };
    case "SET_IS_ADMIN_PREVIEW_ARTICLE_ACTIVE":
      return { ...state, is_admin_preview_article_active: action.payload };
    case "SET_ARTICLE_ID":
      return { ...state, article_id: action.payload };
    case "SET_ARTICLE_TITLE":
      return { ...state, article_title: action.payload };
    case "SET_ARTICLE_TAGS":
      return { ...state, article_tags: action.payload };
    case "SET_MAIN_IMAGE_CONTENT_URL":
      return { ...state, main_image_content_url: action.payload };
    case "SET_ARTICLE_CONTENT":
      return { ...state, article_content: action.payload };
    case "CLEAR_ARTICLE_DATA":
      return {
        ...state,
        set_author_data: { display_name: "", email: "", avatar_url: "", uid: "" },
        article_id: "",
        article_title: "",
        article_tags: [],
        main_image_content_url: "",
        article_content: "",
      };
    default:
      return state;
  }
};

// Context
const PreviewAdminArticleContext = createContext();

// Provider Component
const PreviewAdminArticleContextProvider = ({ children }) => {
  const { handleGetUserPhotoUrl } = useGetUserPhotoUrl();
  const [state, dispatch] = useReducer(previewAdminArticleReducer, initialState);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleData = async (articleId) => {
      try {
        const docRef = doc(db, "articles", articleId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const { title, topicNames, content, author_uid, author_email, author_name, mainImage } = docSnapshot.data();

          //   Get article owner photo
          let avatar_url = "";
          if (author_uid) {
            const articleOwnerPhotoUrl = await handleGetUserPhotoUrl(author_uid);
            articleOwnerPhotoUrl.success && (avatar_url = articleOwnerPhotoUrl.photoUrl);
          }

          //   Set article author data
          dispatch({
            type: "SET_AUTHOR_DATA",
            payload: {
              display_name: author_name,
              email: author_email,
              uid: author_uid,
              avatar_url,
            },
          });

          //   Set another article data to state
          dispatch({ type: "SET_ARTICLE_ID", payload: articleId });
          dispatch({ type: "SET_ARTICLE_TITLE", payload: title });
          dispatch({ type: "SET_ARTICLE_TAGS", payload: topicNames });
          dispatch({ type: "SET_MAIN_IMAGE_CONTENT_URL", payload: mainImage });
          dispatch({ type: "SET_ARTICLE_CONTENT", payload: content });
        } else {
          navigate("/dashboard-admin/persetujuan-artikel", { replace: true });
          console.warn(`No article found with ID: ${articleId}`);
        }
      } catch (error) {
        console.error("Error fetching admin preview article:", error.message);
      }
    };

    const articleId = params.get("id");
    if (articleId) {
      dispatch({ type: "SET_IS_ADMIN_PREVIEW_ARTICLE_ACTIVE", payload: true });
      fetchArticleData(articleId);
    } else {
      dispatch({ type: "SET_IS_ADMIN_PREVIEW_ARTICLE_ACTIVE", payload: false });
      dispatch({ type: "CLEAR_ARTICLE_DATA" });
      navigate("/dashboard-admin/persetujuan-artikel", { replace: true });
    }

    // eslint-disable-next-line
  }, [params, navigate, dispatch]);

  return <PreviewAdminArticleContext.Provider value={{ state, dispatch }}>{children}</PreviewAdminArticleContext.Provider>;
};

PreviewAdminArticleContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook
const usePreviewAdminArticleContext = () => {
  const context = useContext(PreviewAdminArticleContext);
  if (!context) {
    throw new Error("usePreviewAdminArticle must be used within a PreviewAdminArticleContextProvider");
  }
  return context;
};

export { PreviewAdminArticleContextProvider, usePreviewAdminArticleContext };
