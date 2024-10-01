import { Flex, FloatButton, Modal, Tooltip, Typography } from "antd";
import classNames from "classnames";
import { BsInfoCircleFill, BsSend } from "react-icons/bs";
import PropTypes from "prop-types";
import { useState } from "react";
import ButtonComponent from "../../ui/button-component";
import useUpdateArticle from "../../../features/edit-article/hooks/use-update-article";
import { useEditArticlePage } from "./context/edit-article-page-context";

const { Text } = Typography;
const EditArticleFloatButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useEditArticlePage();
  const { article_id, article_title, article_tags, main_image_content, article_content } = state || {};
  const { handleUpdateArticle, messageContextHolder } = useUpdateArticle(
    article_id,
    article_title,
    article_tags,
    main_image_content,
    article_content,
    setIsModalOpen
  );

  return (
    <>
      {messageContextHolder}
      <ConfirmModal handleCancel={() => setIsModalOpen(false)} handleOk={handleUpdateArticle} isModalOpen={isModalOpen} />
      <FloatButtonWithTooltip
        title="kirim artikel"
        icon={<BsSend />}
        handleClick={() => setIsModalOpen(true)}
        id={"edit-article-send-button"}
      />
    </>
  );
};

export default EditArticleFloatButtons;

const ConfirmModal = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      open={isModalOpen}
      title={
        <Flex align="center" gap="middle">
          <Text className="text-lg text-orange-500">
            <BsInfoCircleFill />
          </Text>
          <Text className="font-roboto-slab text-lg">Kirim Artikel</Text>
        </Flex>
      }
      onCancel={handleCancel}
      onOk={handleOk}
      footer={() => (
        <>
          <ButtonComponent className="capitalize text-xs font-roboto-slab" onClick={handleCancel}>
            batal
          </ButtonComponent>
          <ButtonComponent type="primary" className="capitalize text-xs font-roboto-slab" onClick={handleOk}>
            kirim
          </ButtonComponent>
        </>
      )}
    >
      <div className="ml-9">
        <Text className="font-roboto-slab text-xs capitalize sm:text-sm">
          apakah kamu yakin ingin menyimpan perubahan saat ini? artikel kamu akan direview ulang
        </Text>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};

const FloatButtonWithTooltip = ({ handleClick, tooltipClassName, title, icon, isHidden, id, className }) => {
  return (
    <div id={id}>
      <Tooltip
        title={title}
        trigger="hover"
        className={classNames(tooltipClassName, {
          "hidden ": isHidden,
        })}
        mouseEnterDelay={0.7}
        placement="left"
      >
        <FloatButton icon={icon} onClick={handleClick} className={className} />
      </Tooltip>
    </div>
  );
};

FloatButtonWithTooltip.propTypes = {
  handleClick: PropTypes.func,
  tooltipClassName: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  isHidden: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
};
