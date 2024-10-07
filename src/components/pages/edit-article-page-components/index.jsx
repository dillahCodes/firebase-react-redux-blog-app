import { Layout } from "antd";
import MainLayout from "../../layouts/main-layout";
import EditorUpdateArticleTitle from "./editor-update-article-title";
import EditorUpdateArticleTag from "./editor-update-article-tag";
import EditorUpdateArticleMainImage from "./editor-update-article-main-image";
import EditorUpdateArticleContent from "./editor-update-article-content";
import { EditArticlePageProvider } from "./context/edit-article-page-context";
import EditArticleFloatButtons from "./edit-article-float-buttons";

const EditArticlePageComponents = () => {
  return (
    <EditArticlePageProvider>
      <MainLayout>
        <EditArticleFloatButtons />
        <Layout className="max-w-screen-md w-full mx-auto p-3   no-scrollbar">
          <section className="flex flex-col gap-4 h-fit">
            <EditorUpdateArticleTitle id="edit-article-title-input" />
            <EditorUpdateArticleTag id="edit-article-tag-input" />
            <EditorUpdateArticleMainImage id="edit-article-main-image" />
            <EditorUpdateArticleContent id="edit-article-text-editor-article" />
          </section>
        </Layout>
      </MainLayout>
    </EditArticlePageProvider>
  );
};

export default EditArticlePageComponents;
