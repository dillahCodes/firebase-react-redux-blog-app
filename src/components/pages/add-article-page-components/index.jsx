import "./style/antd-tour-style.css";

import MainLayout from "../../layouts/main-layout";
import AddArticleFloatingButtons from "./add-article-floating-buttons";
import { AddArticlePageTourProvider } from "./context/tour-add-article-page-context";
import TourPage from "./tour-page";
import { Layout } from "antd";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreviewArticle from "./preview-article";
import { resetPostDataState, updateArticleId } from "../../../features/post/post-data-slice";
import { v4 as uuidv4 } from "uuid";
import EditorArticle from "./editor-article";

const AddArticlePageComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams(); // eslint-disable-line
  const { article_id: articleIdFromState, is_preview_page_active: isPreviewPageActive } = useSelector((state) => state.postData);

  // set article id to state and reset post data state if page is unmounted
  useEffect(() => {
    dispatch(updateArticleId(uuidv4()));
    return () => dispatch(resetPostDataState());
  }, [dispatch]);

  // set search params when page is mounted
  useEffect(() => {
    location.pathname === "/tambah-artikel" &&
      setSearchParams({ preview: isPreviewPageActive, id: articleIdFromState }, { replace: true });
  }, [setSearchParams, articleIdFromState, isPreviewPageActive, location.pathname]);

  return (
    <AddArticlePageTourProvider>
      <TourPage />
      <MainLayout>
        {!isPreviewPageActive ? (
          // add article pages
          <Layout className="min-h-screen w-full relative" id="add-article-page">
            <AddArticleFloatingButtons />
            <EditorArticle />
          </Layout>
        ) : (
          // preview page
          <Layout className="min-h-screen w-full relative" id="add-article-preview-page">
            <AddArticleFloatingButtons />
            <Layout className="max-w-screen-md w-full mx-auto p-3  overflow-y-auto no-scrollbar">
              <section className="flex flex-col gap-4 h-fit">
                <PreviewArticle />
              </section>
            </Layout>
          </Layout>
        )}

        {/* promt */}
      </MainLayout>
    </AddArticlePageTourProvider>
  );
};

export default AddArticlePageComponent;
