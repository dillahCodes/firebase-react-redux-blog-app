import ButtonComponent from "../../ui/button-component";
import PropTypes from "prop-types";
import "./style/preview-article-style.css";
import useDetectLocation from "../../../hooks/use-detect-location";
import { useNavigate } from "react-router-dom";

const PreviewArticleTopic = ({ articletopic }) => {
  const navigate = useNavigate();
  const { isDetailArticleLocation } = useDetectLocation();

  return (
    <div className="w-full flex flex-wrap gap-3 pt-8">
      {articletopic?.length > 0 &&
        articletopic?.map((tag) => (
          <ButtonComponent
            onClick={() => isDetailArticleLocation && navigate(`/topik-artikel/${tag.topic_name}`)}
            type="primary"
            size="small"
            className="rounded-full text-xs flex items-center px-9 py-3 font-roboto-slab"
            key={tag.topic_id}
          >
            {tag.topic_name}
          </ButtonComponent>
        ))}

      {articletopic?.length === 0 ||
        (!articletopic &&
          Array.from({ length: 3 }).map((_, index) => (
            <ButtonComponent
              type="primary"
              size="small"
              className="rounded-full text-xs flex items-center px-9 py-3 font-roboto-slab"
              key={index}
            >
              topic {index + 1}
            </ButtonComponent>
          )))}
    </div>
  );
};

export default PreviewArticleTopic;

PreviewArticleTopic.propTypes = {
  articletopic: PropTypes.array,
};
