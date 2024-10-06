import { EditorContent, EditorProvider, useEditor } from "@tiptap/react";
import { useEffect, useMemo } from "react";

import "./style/text-editor-style.css";
import "./style/text-editor-code-block-style.css";
import "./style/text-editor-font-size-node-style.css";
import "./style/text-editor-font-family-node-style.css";
import "./style/text-editor-link-node-style.css";

import { debounce } from "lodash";

import PropTypes from "prop-types";
import extensions from "./ekstension";
import { myThemeConfigs } from "../../../theme/antd-theme";
import { Flex } from "antd";
import classNames from "classnames";
import TextEditorMenuComponent from "./menu";

const TextEditorComponent = ({
  initialContent,
  handleHtmlValueOnchange,
  handleJsonValueOnchange,
  editorDebounce = 500,
  isHeaderShow = false,
  articleId,
}) => {
  const editor = useEditor({
    extensions,
    content: initialContent,
  });

  // debounced function using useMemo to ensure it doesn't recreate on every render
  const debounceEditorChange = useMemo(
    () =>
      debounce(({ htmlValue, JsonValue }) => {
        handleHtmlValueOnchange(htmlValue);
        handleJsonValueOnchange(JsonValue);
      }, editorDebounce),
    [handleHtmlValueOnchange, handleJsonValueOnchange, editorDebounce]
  );

  // Handle text change with debounce inside useEffect
  useEffect(() => {
    if (editor) {
      const handleUpdate = ({ editor }) => {
        const html = editor.view.dom.innerHTML;
        const json = editor.getJSON();
        debounceEditorChange({ htmlValue: html, JsonValue: json });
      };

      // Add update event listener
      editor.on("update", handleUpdate);

      // Clean up on unmount
      return () => {
        editor.off("update", handleUpdate);
        debounceEditorChange.cancel();
      };
    }
  }, [editor, debounceEditorChange]);

  if (!editor) return null;

  return (
    <EditorProvider extensions={extensions}>
      <Flex vertical gap="middle">
        <div
          className={classNames("w-full sticky  transition-all duration-300 top-0 z-10", {
            "top-0": !isHeaderShow,
            "top-16 ": isHeaderShow,
          })}
        >
          <TextEditorMenuComponent articleId={articleId} editor={editor} />
        </div>
        <div
          className="w-full min-h-[300px] border border-black p-2 rounded-md"
          style={myThemeConfigs.siderBorderStyle}
          onClick={() => editor.commands.focus()}
        >
          <EditorContent editor={editor} />
        </div>
      </Flex>
    </EditorProvider>
  );
};

TextEditorComponent.propTypes = {
  initialContent: PropTypes.object,
  handleHtmlValueOnchange: PropTypes.func,
  handleJsonValueOnchange: PropTypes.func,
  editorDebounce: PropTypes.number,
  articleId: PropTypes.string,
  isHeaderShow: PropTypes.bool,
};

export default TextEditorComponent;
