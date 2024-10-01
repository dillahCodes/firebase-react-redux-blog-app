import useSetPostArticleContent from "../../../features/post/hooks/use-set-post-article-content";
import TextEditorComponent from "../../layouts/text-editor/text-edior-component";

const EditorArticleTextEditor = ({ ...props }) => {
  const { article_content, handleUpdateArticleContent } = useSetPostArticleContent();

  return (
    <div {...props} className="border border-green-600">
      <TextEditorComponent
        initialContent={article_content}
        handleOnChangeTextEdior={(content) => handleUpdateArticleContent(content)}
      />
    </div>
  );
};

export default EditorArticleTextEditor;
