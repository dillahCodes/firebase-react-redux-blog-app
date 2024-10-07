import { FloatButton, Tooltip } from "antd";
import { BsSend } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiDraftLine } from "react-icons/ri";
import PropTypes from "prop-types";
// import usePostArticle from "../../../features/post/hooks/use-post-article";
import useHandleFLoatingButtons from "../../../features/post/hooks/use-handle-floating-buttons";
import classNames from "classnames";
import { useAddArticlePageTour } from "./context/tour-add-article-page-context";
import "./style/add-article-floating-buttons.css";
import { useSelector } from "react-redux";
import { AiOutlineRollback } from "react-icons/ai";

const { Group } = FloatButton;
const AddArticleFloatingButtons = ({ ...props }) => {
  const isPreviewPageActive = useSelector((state) => state.postData.is_preview_page_active);
  const { state, dispatch } = useAddArticlePageTour();
  const { isFloatingSendButtonActive } = state;
  const {
    handleToggleFloatingButtons,
    errorMessageContext,
    handleFloatingButtonIsComingSoon,
    handleOpenTour,
    handlePreviewPage,
    handleClosePreviewPage,
    handleSendArticle,
  } = useHandleFLoatingButtons();

  return (
    <>
      {errorMessageContext}
      <Group
        {...props}
        id="floating-button-group"
        open={isFloatingSendButtonActive}
        onClick={() => handleToggleFloatingButtons(state, dispatch)}
        trigger="click"
        className=" bottom-5 z-20"
        icon={<FloatButtonIcon icon={<BsSend />} />}
      >
        {!isPreviewPageActive && (
          <FloatButtonWithTooltip
            title="Bantuan"
            id="floating-button-help"
            handleClick={() => handleOpenTour(dispatch)}
            icon={<FloatButtonIcon icon={<IoIosHelpCircleOutline />} />}
          />
        )}
        {!isPreviewPageActive && (
          <FloatButtonWithTooltip
            title="pertenjau artikel"
            id="floating-button-preview"
            handleClick={() => handlePreviewPage(dispatch)}
            icon={<FloatButtonIcon icon={<FaRegEye />} />}
          />
        )}
        <FloatButtonWithTooltip
          title="simpan sebagi draf"
          id="floating-button-draft"
          handleClick={() => handleFloatingButtonIsComingSoon(dispatch)}
          icon={<RiDraftLine />}
        />
        <FloatButtonWithTooltip
          id="floating-button-send"
          title="kirim artikel"
          handleClick={handleSendArticle}
          icon={<BsSend />}
        />
        {isPreviewPageActive && (
          <FloatButtonWithTooltip
            id="floating-button-back"
            title="kembali"
            handleClick={() => handleClosePreviewPage(dispatch)}
            icon={<AiOutlineRollback />}
          />
        )}
      </Group>
    </>
  );
};

export default AddArticleFloatingButtons;

const FloatButtonWithTooltip = ({ handleClick, className, title, icon, isHidden, id }) => {
  return (
    <div id={id}>
      <Tooltip
        title={title}
        trigger="hover"
        className={classNames(className, {
          "hidden ": isHidden,
        })}
        mouseEnterDelay={0.7}
        placement="left"
      >
        <FloatButton icon={icon} onClick={handleClick} />
      </Tooltip>
    </div>
  );
};

FloatButtonWithTooltip.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  isHidden: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
};

const FloatButtonIcon = ({ className, icon }) => {
  return <span className={className}>{icon}</span>;
};

FloatButtonIcon.displayName = "FloatButtonIcon";
FloatButtonIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
};
