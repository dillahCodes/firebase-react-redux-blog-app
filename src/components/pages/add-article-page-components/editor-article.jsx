import { Layout } from "antd";
import EditorArticleTitle from "./editor-article-title";
import EditorArticleTag from "./editor-article-tag";
import EditorMainImage from "./editor-article-main-image";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBeforeUnload from "../../../hooks/use-before-unload";
import EditorArticleTextEditor from "./editor-article-text-editor";

const EditorArticle = () => {
  const [searchParams] = useSearchParams();
  const { article_content, article_tags, article_title, main_image_content } = useSelector((state) => state.postData);

  const hasTitle = article_title?.trim() !== "";
  const hasTags = article_tags?.length > 0;
  const hasMainImage = Boolean(main_image_content);
  const hasContent = article_content?.length > 0 && article_content && article_content.trim() !== "";

  const isWarnUserIfLeavingPageActive = hasTitle || hasTags || hasMainImage || hasContent;
  const isIgnoreWarn = searchParams.get("preview");

  // warn user if reloading/leaving/navigating the page.
  useBeforeUnload({
    message: "Yakin mau pergi? Perubahan tidak akan disimpan! 💾",
    when: isWarnUserIfLeavingPageActive,
    ignore: isIgnoreWarn,
  });

  // console.log(isWarnUserIfLeavingPageActive);

  return (
    <Layout className="max-w-screen-md w-full mx-auto p-3  overflow-y-auto no-scrollbar">
      <section className="flex flex-col gap-4 h-fit">
        <EditorArticleTitle id="add-article-title-input" />
        <EditorArticleTag id="add-article-tag-input" />
        <EditorMainImage id="add-article-main-image" />
        <EditorArticleTextEditor id="add-article-text-editor-article" />
      </section>
    </Layout>
  );
};

export default EditorArticle;
