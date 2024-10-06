import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player/lazy";

const VideoNodeVisualization = ({ node }) => {
  const isInvalid = !node.attrs.url;

  return (
    <NodeViewWrapper className="video-node mb-[14px]">
      {isInvalid ? (
        <div className="video-node-error">Invalid Video URL</div>
      ) : (
        <div className="video-node-container w-full h-[300px]  rounded-md overflow-hidden">
          <ReactPlayer controls url={node.attrs.url} width="100%" height="100%" />
        </div>
      )}
    </NodeViewWrapper>
  );
};

VideoNodeVisualization.propTypes = {
  node: PropTypes.object.isRequired,
};

const VideoNode = Node.create({
  name: "videoNode",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      url: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[class=video-node]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoNodeVisualization);
  },

  addCommands() {
    return {
      setVideo:
        ({ url }) =>
        ({ commands }) => {
          return commands.insertContent([
            {
              type: this.name,
              attrs: {
                url,
              },
            },
            {
              type: "paragraph", // add a paragraph after the image node for correct spacing
              attrs: {
                textAlign: "center",
              },
              content: [
                {
                  type: "text",
                  text: `${url}`,
                },
              ],
            },
          ]);
        },
    };
  },
});

export default VideoNode;
