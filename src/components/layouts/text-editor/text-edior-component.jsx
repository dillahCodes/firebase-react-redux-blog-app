import { EditorContent, EditorProvider, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Flex } from "antd";

const content = "<p>hello world</p>";
const extensions = [StarterKit];
const TextEditorComponent = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
  });

  return (
    <EditorProvider extensions={extensions} content={content}>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Flex id="text-editor-floating-menu">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet list
          </button>
        </Flex>
      </FloatingMenu>
      <EditorContent editor={editor} />
    </EditorProvider>
  );
};

export default TextEditorComponent;
