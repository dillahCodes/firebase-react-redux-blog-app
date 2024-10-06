import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { Skeleton } from "antd";

const ImageNodeVisualization = ({ node }) => {
  const isInvalid = !node.attrs.src || !node.attrs.alt;
  return (
    <NodeViewWrapper className="image-node mb-[14px]">
      <div className="image-node-container w-full h-[300px]">
        {isInvalid ? (
          <Skeleton.Image className="w-full h-full" active />
        ) : (
          <img src={node.attrs.src} alt={node.attrs.alt} className="w-full h-full object-cover" />
        )}
      </div>
    </NodeViewWrapper>
  );
};

ImageNodeVisualization.propTypes = {
  node: PropTypes.object,
};

const ImageNode = Node.create({
  name: "imageNode",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      id: {
        default: uuidv4(),
      },
      class: {
        default: "article-image-node",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeVisualization);
  },

  addCommands() {
    return {
      setImage:
        ({ src, alt }) =>
        ({ commands }) => {
          return commands.insertContent([
            {
              type: this.name,
              attrs: {
                src,
                alt,
              },
            },
            {
              type: "paragraph", // add a paragraph after the image node for correct spacing
              attrs: {
                textAlign: "left",
              },
            },
          ]);
        },
    };
  },
});

export default ImageNode;
