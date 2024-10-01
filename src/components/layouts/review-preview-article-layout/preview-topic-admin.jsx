import ButtonComponent from "../../ui/button-component";
import PropTypes from "prop-types";
import "./style/preview-article-style.css";

const PreviewArticleTopicAdmin = ({ articletopic }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 pt-8">
      {articletopic.length > 0 &&
        articletopic.map((tag, index) => (
          <ButtonComponent
            type="primary"
            size="small"
            className="rounded-full text-xs flex items-center px-9 py-3 font-roboto-slab"
            key={index}
          >
            {tag}
          </ButtonComponent>
        ))}

      {articletopic.length === 0 &&
        Array.from({ length: 3 }).map((_, index) => (
          <ButtonComponent
            type="primary"
            size="small"
            className="rounded-full text-xs flex items-center px-9 py-3 font-roboto-slab"
            key={index}
          >
            topic {index + 1}
          </ButtonComponent>
        ))}
    </div>
  );
};

export default PreviewArticleTopicAdmin;

PreviewArticleTopicAdmin.propTypes = {
  articletopic: PropTypes.array,
};
