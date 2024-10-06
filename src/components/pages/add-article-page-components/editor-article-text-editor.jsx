import { useSelector } from "react-redux";
import useSetPostArticleContent from "../../../features/post/hooks/use-set-post-article-content";
import TextEditorComponent from "../../layouts/text-editor/text-edior-component";
import useHeader from "../../../hooks/use-header";

const EditorArticleTextEditor = ({ ...props }) => {
  const { isHeaderShown } = useHeader();
  const { article_content_json, handleUpdateArticleContent, handleUpdateArticleContentJson } = useSetPostArticleContent();
  const { article_id } = useSelector((state) => state.postData);

  return (
    <div {...props}>
      <TextEditorComponent
        initialContent={article_content_json}
        handleHtmlValueOnchange={handleUpdateArticleContent}
        handleJsonValueOnchange={handleUpdateArticleContentJson}
        articleId={article_id}
        isHeaderShow={isHeaderShown}
      />
    </div>
  );
};

export default EditorArticleTextEditor;
