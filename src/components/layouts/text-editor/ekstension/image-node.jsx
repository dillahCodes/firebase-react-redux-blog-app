import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
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
          <img src={node.attrs.src} alt={node.attrs.alt} id={node.attrs.id} className="w-full h-full object-cover" />
        )}
      </div>
    </NodeViewWrapper>
  );
};

ImageNodeVisualization.propTypes = {
  node: PropTypes.object.isRequired,
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
      class: {
        default: "article-image-node",
      },
      id: {
        default: null,
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
        ({ src, alt, id }) =>
        ({ commands }) => {
          return commands.insertContent([
            {
              type: this.name,
              attrs: {
                src,
                alt,
                id,
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
