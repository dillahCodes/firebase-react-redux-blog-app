import useUser from "../../../features/auth/hooks/use-user";
import EditorTextEditorArticle from "../../layouts/text-editor/text-editor-component";
import { useEditArticlePage } from "./context/edit-article-page-context";

const EditorUpdateArticleContent = ({ ...props }) => {
  const { user } = useUser();
  const { state, dispatch } = useEditArticlePage();

  return (
    <EditorTextEditorArticle
      initialContent={state?.article_content}
      userId={user.uid}
      articleId={state?.article_id}
      onContentChange={(content) => dispatch({ type: "SET_ARTICLE_CONTENT", payload: content })}
      {...props}
    />
  );
};

export default EditorUpdateArticleContent;
