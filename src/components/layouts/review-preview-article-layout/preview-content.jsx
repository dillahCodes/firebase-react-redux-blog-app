import { Typography } from "antd";
import PropTypes from "prop-types";
import "./style/preview-article-style.css";

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
