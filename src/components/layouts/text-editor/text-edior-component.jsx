import { EditorContent, EditorProvider, FloatingMenu, useEditor } from "@tiptap/react";
import { Flex } from "antd";
import { useCallback, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";

import "./style/text-editor-style.css";
import { debounce } from "lodash";
import ButtonComponent from "../../ui/button-component";
import { MdFormatListBulleted } from "react-icons/md";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

import PropTypes from "prop-types";

const extensions = [StarterKit];
const TextEditorComponent = ({ initialContent, handleOnChangeTextEdior, editorDebounce = 500 }) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
  });

  // initial content and text change
  useEffect(() => {
    if (editor) editor.commands.setContent(initialContent);
  }, [editor, initialContent]);

  // debounced function
  //   eslint-disable-next-line
  const debouncedHandleChange = useCallback(
    debounce((html) => handleOnChangeTextEdior(html), editorDebounce),
    [handleOnChangeTextEdior]
  );

  // handle text change with debounce
  useEffect(() => {
    if (editor) {
      editor.on("update", ({ editor }) => {
        const html = editor.getHTML();
        debouncedHandleChange(html);
      });
    }

    return () => {
      editor?.off("update");
      debouncedHandleChange.cancel();
    };
  }, [editor, debouncedHandleChange]);

  if (!editor) return null;

  return (
    <EditorProvider extensions={extensions}>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className="mt-4 ml-3">
        <Flex id="text-editor-floating-menu" gap="small" className="bg-[#fafff0] border border-black rounded-md p-2">
          <ButtonComponent
            icon={<LuHeading1 />}
            type="primary"
            size="small"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "is-active" : "text-sm"}
          />

          <ButtonComponent
            icon={<LuHeading2 />}
            type="primary"
            size="small"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "is-active" : "text-sm"}
          />

          <ButtonComponent
            icon={<MdFormatListBulleted />}
            type="primary"
            size="small"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : "text-sm"}
          />
        </Flex>
      </FloatingMenu>
      <EditorContent editor={editor} />
    </EditorProvider>
  );
};

TextEditorComponent.propTypes = {
  initialContent: PropTypes.string,
  handleOnChangeTextEdior: PropTypes.func,
  editorDebounce: PropTypes.number,
};

export default TextEditorComponent;
