import { Mark } from "@tiptap/core";

const FontFamily = Mark.create({
  name: "fontFamily",

  addOptions() {
    return {
      types: ["fontFamily"],
      fontFamily: ["roboto-slab", "special-elite"], // list font family allowed
    };
  },

  addAttributes() {
    return {
      fontFamily: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) return {};
          return { "data-font-family": attributes.fontFamily };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "font-family",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", { ...HTMLAttributes }, 0];
  },

  addCommands() {
    return {
      setFontFamily:
        (fontFamily) =>
        ({ commands }) => {
          return commands.setMark(this.name, { fontFamily });
        },

      unsetFontFamily:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default FontFamily;
