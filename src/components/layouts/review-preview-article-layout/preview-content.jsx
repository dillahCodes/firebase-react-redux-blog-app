import { Typography } from "antd";
import PropTypes from "prop-types";

// node style
import "./style/article-code-node-style.css";
import "./style/article-image-node-style.css";
import "./style/article-font-family-node-style.css";
import "./style/article-font-size-node-style.css";

const { Text } = Typography;
const PreviewArticleContent = ({ content }) => {
  return content !== "<p><br></p>" && content ? (
    <section id="preview-article" dangerouslySetInnerHTML={{ __html: content }} />
  ) : (
    <Text className="capitalize font-roboto-slab opacity-[.6]">kamu belum menulis konten apapun...</Text>
  );
};

export default PreviewArticleContent;

PreviewArticleContent.propTypes = {
  content: PropTypes.string,
};
