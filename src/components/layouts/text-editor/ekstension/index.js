import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import lowlight from "../configs/code-node-config";
import TextAlign from "@tiptap/extension-text-align";
import History from "@tiptap/extension-history";
import ImageNode from "./image-node";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "./font-size-node";
import FontFamily from "./font-family-node";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import VideoNode from "./video-node";
import Heading from "@tiptap/extension-heading";

// this ekstension for text editor
// DOC: https://tiptap.dev/docs/editor/extensions/custom-extensions
const extensions = [
  StarterKit.configure({
    codeBlock: false,
    history: false,
    italic: false,
    strike: false,
    heading: false,
  }),
  Heading.configure({
    levels: [1, 2, 3, 4, 5],
    HTMLAttributes: (attributes) => ({
      "data-font-size": attributes.size || null,
    }),
  }),
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class: "article-code-node",
    },
    defaultLanguage: "js",
  }),
  // Extension lainnya tetap sama
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  History,
  ImageNode,
  TextStyle,
  FontSize,
  FontFamily,
  Link.configure({
    linkOnPaste: true,
    defaultProtocol: "https",
    HTMLAttributes: {
      class: "link-node",
    },
  }),
  Highlight.configure({
    multicolor: true,
  }),
  Italic,
  Strike,
  Subscript,
  Superscript,
  Underline,
  VideoNode,
];

export default extensions;
