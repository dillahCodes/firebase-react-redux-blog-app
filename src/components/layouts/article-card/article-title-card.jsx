import classNames from "classnames";
import { isBrowser, isMobile } from "react-device-detect";
import PropTypes from "prop-types";

import { Skeleton, Typography } from "antd";

const { Title } = Typography;
const ArticleTitleCard = ({ articleTitle, isLoading }) => {
  if (isLoading)
    return (
      <div className="max-w-[300px]">
        <Skeleton.Button active={true} className="w-full h-full" />
      </div>
    );

  return (
    <Title
      level={2}
      className={classNames(
        " text-lg text-black line-clamp-2 hover:underline cursor-pointer transition-all duration-300 capitalize font-special-elite",
        {
          "text-sm ": isMobile,
          "mb-3": isBrowser,
        }
      )}
    >
      {articleTitle || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, culpa?"}
    </Title>
  );
};

export default ArticleTitleCard;

ArticleTitleCard.propTypes = {
  articleTitle: PropTypes.string,
  isLoading: PropTypes.bool,
};
