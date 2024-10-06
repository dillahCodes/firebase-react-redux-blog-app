import { Mark } from "@tiptap/core";

const FontSize = Mark.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
      sizes: ["small", "medium", "large", "extra-large"],
    };
  },

  addAttributes() {
    return {
      size: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.size) return {};
          return { "data-font-size": attributes.size };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: "font-size",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", { ...HTMLAttributes }, 0]; // Wrapping text in a span to store font size
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ commands }) => {
          return commands.setMark(this.name, { size });
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default FontSize;
