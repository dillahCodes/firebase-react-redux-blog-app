import classNames from "classnames";
import { isMobile } from "react-device-detect";
import { Skeleton, Typography } from "antd";
import calculateReadingTime from "../../../utils/calculate-reading-time";
import PropTypes from "prop-types";

const { Text } = Typography;
const ReadingTimeArticleCard = ({ content, isLoading }) => {
  if (isLoading)
    return (
      <div className="max-w-[100px] mt-2">
        <Skeleton.Button active={true} className="w-full h-full" />
      </div>
    );

  return (
    <Text
      className={classNames("text-xs  text-black min-w-fit truncate font-roboto-slab break-words whitespace-normal", {
        "text-[9px] truncate": isMobile,
      })}
    >
      {calculateReadingTime(content)}
    </Text>
  );
};

export default ReadingTimeArticleCard;

ReadingTimeArticleCard.propTypes = {
  content: PropTypes.string,
  isLoading: PropTypes.bool,
};
