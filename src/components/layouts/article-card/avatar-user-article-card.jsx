import classNames from "classnames";
import { Flex, Skeleton, Typography } from "antd";
import PropTypes from "prop-types";
import formatEpochToIndonesianDate from "../../../utils/convert-time";
import AvatarProfile from "../../ui/avatar-profile";

const { Text } = Typography;
const AvatarUserArticleCard = ({ avatarURL, name, dateEpoch, isLoading, size = 30 }) => {
  if (isLoading) {
    return (
      <Flex align="center" justify="space-between" gap={"middle"} className="w-fit mb-2">
        <Skeleton.Avatar active={true} className="w-full h-full" gap />
        <Flex align="center" gap={"small"}>
          <Skeleton.Button active={true} className="w-full h-3 " />
          <Skeleton.Button active={true} className="w-full h-3" />
        </Flex>
      </Flex>
    );
  }

  return (
    <div className="w-full mb-3 flex items-center gap-x-3">
      <div>
        <AvatarProfile photoURL={avatarURL} size={size} />
      </div>
      <Text className={classNames("text-xs text-black font-roboto-slab break-words whitespace-normal")}>{name}</Text>
      <span>•</span>
      <Text className={classNames("text-xs text-black font-roboto-slab break-words whitespace-normal")}>
        {formatEpochToIndonesianDate(dateEpoch)}
      </Text>
    </div>
  );
};

export default AvatarUserArticleCard;

AvatarUserArticleCard.propTypes = {
  avatarURL: PropTypes.string,
  name: PropTypes.string,
  dateEpoch: PropTypes.number,
  isLoading: PropTypes.bool,
  size: PropTypes.number,
};
