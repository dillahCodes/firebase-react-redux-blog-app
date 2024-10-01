import { useDispatch, useSelector } from "react-redux";
import EditorTextEditorArticle from "../../layouts/text-editor/text-editor-component";
import { updateArticleContent } from "../../../features/post/post-data-slice";

const EditorArticleTextEditor = ({ ...props }) => {
  const dispatch = useDispatch();
  const initialContent = useSelector((state) => state.postData?.article_content);
  const userId = useSelector((state) => state.auth.user.uid);
  const onTextChange = (content) => dispatch(updateArticleContent(content));
  const articleId = useSelector((state) => state.postData?.article_id);

  return (
    <EditorTextEditorArticle
      initialContent={initialContent}
      userId={userId}
      articleId={articleId}
      onContentChange={onTextChange}
      {...props}
    />
  );
};

export default EditorArticleTextEditor;
