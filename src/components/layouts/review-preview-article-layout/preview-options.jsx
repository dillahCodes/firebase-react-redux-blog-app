import { Button, Flex } from "antd";
import Typography from "antd/es/typography/Typography";
import { BsBookmark, BsShare, BsThreeDots } from "react-icons/bs";
import { PiHandsClappingFill } from "react-icons/pi";
import { TfiCommentAlt } from "react-icons/tfi";
import PropTypes from "prop-types";
import classNames from "classnames";
import withComingSoonMessage from "../../hoc/with-coming-soon-message";
import withAuthModal from "../../hoc/with-auth-modal";
import "./style/preview-article-style.css";

const { Text } = Typography;

// Main component for article interaction buttons
const PreviewArticleOptionsButtons = ({
  isBorderActive,
  likeCount,
  commentCount,
  likeHandler,
  isThisArticleLiked,
  isPreview = true,
  isUserLoggedIn = true,
}) => {
  return (
    <Flex
      align="center"
      className={classNames("py-2 w-full mt-5", {
        "border-[#b8e986] border-y-2": isBorderActive,
      })}
      justify="space-between"
    >
      {/* Interaction buttons (like, comment) */}
      <Flex align="center" gap="small">
        {isUserLoggedIn ? (
          <>
            <PreviewActionButton
              icon={<PiHandsClappingFill />}
              condition={isThisArticleLiked}
              conditionClass="text-black"
              onClick={isPreview ? () => {} : likeHandler}
              text={likeCount || 0}
            />
            <PreviewActionButton icon={<TfiCommentAlt />} text={commentCount || 0} />
          </>
        ) : (
          <>
            <PreviewActionButtonWithAuthModal
              icon={<PiHandsClappingFill />}
              condition={isThisArticleLiked}
              conditionClass="text-black"
              text={likeCount || 0}
            />
            <PreviewActionButtonWithAuthModal icon={<TfiCommentAlt />} text={commentCount || 0} />
          </>
        )}
      </Flex>

      {/* Menu options buttons (bookmark, share, more) */}
      <Flex align="center" gap="small">
        {isPreview ? (
          <>
            <PreviewMenuButton icon={<BsBookmark />} />
            <PreviewMenuButton icon={<BsShare />} />
            <PreviewMenuButton icon={<BsThreeDots />} />
          </>
        ) : (
          <>
            <PreviewMenuButtonWithComingSoonMessage icon={<BsBookmark />} />
            <PreviewMenuButtonWithComingSoonMessage icon={<BsShare />} />
            <PreviewMenuButtonWithComingSoonMessage icon={<BsThreeDots />} />
          </>
        )}
      </Flex>
    </Flex>
  );
};

// Prop validation
PreviewArticleOptionsButtons.propTypes = {
  isBorderActive: PropTypes.bool,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  likeHandler: PropTypes.func,
  isThisArticleLiked: PropTypes.bool,
  isPreview: PropTypes.bool,
  isUserLoggedIn: PropTypes.bool,
};

// Preview action buttons (like, comment)
const PreviewActionButton = ({ icon, text, conditionClass = "", condition = false, ...props }) => {
  return (
    <Button
      {...props}
      type="primary"
      size="small"
      className={classNames(
        "rounded-md font-bold p-0 relative bg-transparent text-base hover:text-black snap-start shadow-none capitalize cursor-pointer font-special-elite",
        { [conditionClass]: condition }
      )}
    >
      {icon}
      <Text className={classNames("text-xs min-w-fit truncate font-roboto-slab break-words whitespace-normal")}>{text || 0}</Text>
    </Button>
  );
};

// Prop validation for action buttons
PreviewActionButton.propTypes = {
  icon: PropTypes.node,
  condition: PropTypes.bool,
  conditionClass: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// Higher-order components for action buttons (like, comment)
const PreviewActionButtonWithAuthModal = withAuthModal(PreviewActionButton);

// Menu options buttons (bookmark, share, more)
const PreviewMenuButton = ({ icon, ...props }) => {
  return (
    <Button
      {...props}
      type="primary"
      size="small"
      className={classNames(
        "rounded-md font-bold p-0 relative bg-transparent text-base hover:text-black snap-start shadow-none capitalize cursor-pointer font-special-elite"
      )}
    >
      {icon}
    </Button>
  );
};

// Prop validation for menu buttons
PreviewMenuButton.propTypes = {
  icon: PropTypes.node,
};

// Higher-order components for menu buttons (bookmark, share, more)
const PreviewMenuButtonWithComingSoonMessage = withComingSoonMessage(PreviewMenuButton);

export default PreviewArticleOptionsButtons;
