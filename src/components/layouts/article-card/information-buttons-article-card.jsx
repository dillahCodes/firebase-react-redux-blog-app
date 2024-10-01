import { Button, Flex, Skeleton } from "antd";
import classNames from "classnames";
import { FaRegCommentDots, FaRegEye } from "react-icons/fa";
import { PiHandsClappingFill } from "react-icons/pi";
import { Typography } from "antd";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { RiMoreFill } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import PropTypes from "prop-types";
import withComingSoonMessage from "../../hoc/with-coming-soon-message";

const actionsButtons = [
  {
    icon: <IoIosRemoveCircleOutline />,
    text: "Remove",
  },
  {
    icon: <RiMoreFill />,
    text: "More",
  },
  {
    icon: <CiBookmark />,
    text: "Bookmark",
  },
];

const informationButtons = [
  {
    icon: <FaRegEye />,
    text: "View",
  },
  {
    icon: <PiHandsClappingFill />,
    text: "Like",
  },
  {
    icon: <FaRegCommentDots />,
    text: "Comment",
  },
];

const { Text } = Typography;
const InformationButtonsArticleCard = ({ like, comment, view, isLoading }) => {
  const informationParams = (text) => {
    switch (text) {
      case "View":
        return view;
      case "Like":
        return like;
      case "Comment":
        return comment;
      default:
        return null;
    }
  };

  if (isLoading)
    return (
      <div className=" flex  gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton.Button key={index} active={true} className="w-full h-full" />
        ))}
      </div>
    );

  return (
    <Flex align="center" justify="space-between" wrap className=" w-full">
      <Flex align="center" gap="small">
        {informationButtons.map((item, index) => (
          <InformationButton key={index} icon={item.icon} text={informationParams(item.text)} />
        ))}
      </Flex>
      <Flex align="center" gap="small">
        {actionsButtons.map((item, index) => (
          <InformationButtonWithComingSoon key={index} icon={item.icon} />
        ))}
      </Flex>
    </Flex>
  );
};

export default InformationButtonsArticleCard;

InformationButtonsArticleCard.propTypes = {
  like: PropTypes.number,
  isLoading: PropTypes.bool,
  comment: PropTypes.number,
  view: PropTypes.number,
};

const InformationButton = ({ text, icon, ...props }) => {
  return (
    <Button
      {...props}
      type="primary"
      size="small"
      className={classNames(
        "rounded-md font-bold  p-0 relative bg-transparent text-base hover:text-black snap-start shadow-none capitalize cursor-pointer font-special-elite "
      )}
    >
      {icon}
      <Text className={classNames("text-xs   min-w-fit truncate font-roboto-slab break-words whitespace-normal")}>{text}</Text>
    </Button>
  );
};
const InformationButtonWithComingSoon = withComingSoonMessage(InformationButton);

InformationButton.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
};
