import Quill from "quill";
import "quill/dist/quill.snow.css";

// // Custom Font Registration
// const Font = Quill.import("attributors/class/font");
// Font.whitelist = ["roboto-slab", "serif"];
// Quill.register(Font, true);

// // Custom Image Blot
// const BlockEmbed = Quill.import("blots/block/embed");
// class CustomImageBlot extends BlockEmbed {
//   static create(value) {
//     let node = super.create();
//     node.setAttribute("src", value.url);
//     if (value.id) {
//       node.setAttribute("id", value.id);
//     }
//     return node;
//   }

//   static value(node) {
//     return {
//       url: node.getAttribute("src"),
//       id: node.getAttribute("id"),
//     };
//   }
// }

// CustomImageBlot.blotName = "custom-image";
// CustomImageBlot.tagName = "img";
// Quill.register(CustomImageBlot);

// Configuration for the Text Editor
export const textEditorConfig = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["link", "image", "video"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ header: [2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: ["roboto-slab", "serif"] }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  },
  formats: [
    "background",
    "bold",
    "color",
    "font",
    "code",
    "italic",
    "link",
    "size",
    "strike",
    "script",
    "underline",
    "blockquote",
    "header",
    "indent",
    "list",
    "align",
    "direction",
    "code-block",
    "image",
    "video",
    "custom-image", // Register custom-image here
  ],
};
