import "quill/dist/quill.snow.css";
import "./style/content-quill-style.css";

import { useQuill } from "react-quilljs";
import { Content } from "antd/es/layout/layout";
// import useTextEditor from "./hooks/use-text-editor";
import { textEditorConfig } from "./text-editor-configs";
import PropTypes from "prop-types";

const EditorTextEditorArticle = ({ initialContent = "", onContentChange, userId, articleId, ...props }) => {
  // const { quill, quillRef } = useQuill(textEditorConfig);
  // useTextEditor({ quill, quillRef, initialContent, onContentChange, userId, articleId });

  return (
    <Content {...props} className="min-h-[100px] h-fit">
      {/* <div ref={quillRef} className="min-h-[100px] max-h-[300px] overflow-y-auto scrollbar-custom" /> */}
    </Content>
  );
};

export default EditorTextEditorArticle;

EditorTextEditorArticle.propTypes = {
  initialContent: PropTypes.string,
  onContentChange: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
};
