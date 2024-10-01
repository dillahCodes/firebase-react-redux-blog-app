import { Flex, FloatButton, Input, Layout, Tooltip, Typography } from "antd";
import PreviewArticleContent from "../../layouts/review-preview-article-layout/preview-content";
import PreviewArticleMainImage from "../../layouts/review-preview-article-layout/preview-main-image";
import PreviewArticleOptionsButtons from "../../layouts/review-preview-article-layout/preview-options";
import PreviewArticleProfile from "../../layouts/review-preview-article-layout/preview-profile";
import PreviewArticleTitle from "../../layouts/review-preview-article-layout/preview-title";
import PreviewArticleTopicAdmin from "../../layouts/review-preview-article-layout/preview-topic-admin";
import { usePreviewAdminArticleContext } from "./context/preview-article-context";
import { PiCheckBold, PiDotsNineBold } from "react-icons/pi";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SlClose } from "react-icons/sl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ModalComponent from "../../ui/modal-component";
import { MdInfo } from "react-icons/md";
import useRejectArticleList from "../../../features/admin/hooks/use-reject-article-list";
import useAcceptArticle from "../../../features/admin/hooks/use-accept-article";
import { AiOutlineRollback } from "react-icons/ai";

const PreviewArticleAdmin = () => {
  const { state } = usePreviewAdminArticleContext();
  const { set_author_data, article_title, main_image_content_url, article_content, article_tags } = state;
  const { avatar_url, display_name } = set_author_data;

  return (
    <Layout className="w-full max-w-screen-lg mx-auto p-5 bg-transparent">
      <PreviewArticleTitle title={article_title} />
      <PreviewArticleProfile photoURL={avatar_url} displayName={display_name} />
      <PreviewArticleMainImage mainImage={main_image_content_url} />
      <PreviewArticleContent content={article_content} />
      <PreviewArticleTopicAdmin articletopic={article_tags} />
      <PreviewArticleOptionsButtons />
      <FloatingButtonArticleAdminPreview />
    </Layout>
  );
};

export default PreviewArticleAdmin;

const { Group } = FloatButton;
const { Text } = Typography;
const FloatingButtonArticleAdminPreview = () => {
  const { handleAcceptArticle, acceptArticleModalContext } = useAcceptArticle();
  const { handleRejectArticle } = useRejectArticleList();
  const navigate = useNavigate();
  const [isFloatingButtonOpen, setIsFloatingButtonOpen] = useState(false);
  const [params] = useSearchParams();
  const [rejectedModal, setRejectedModal] = useState({
    isOpen: false,
    rejectedMessage: "",
    isInputMessageError: false,
  });
  const handleConfirm = () => handleAcceptArticle(params.get("id"));

  const handleOpenModalRejectArticle = () => setRejectedModal((prev) => ({ ...prev, isOpen: true }));
  const handleConfirmRejectArticle = () => {
    if (rejectedModal.rejectedMessage.trim() === "") {
      setRejectedModal((prev) => ({ ...prev, isInputMessageError: true }));
      return;
    } else {
      handleRejectArticle(params.get("id"), rejectedModal.rejectedMessage).then(() => {
        setIsFloatingButtonOpen(false);
        navigate("/dashboard-admin/persetujuan-artikel");
      });
    }
  };

  const modalContentRejectArticle = (
    <Flex vertical gap={"large"} className="pl-8">
      <Text className="font-roboto-slab text-sm">Apakah anda yakin ingin menolak artikel ini?</Text>
      <label htmlFor="reason">
        <Text className="font-roboto-slab text-sm">Alasan:</Text>
        <Flex vertical>
          <Input.TextArea
            status={rejectedModal.isInputMessageError ? "error" : null}
            id="reason"
            onChange={(e) => setRejectedModal((prev) => ({ ...prev, rejectedMessage: e.target.value }))}
            value={rejectedModal.rejectedMessage}
            placeholder="alasan penolakan artikel"
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
          {rejectedModal.isInputMessageError && (
            <Text className="font-roboto-slab text-red-500 text-xs">Alasan penolakan harus diisi</Text>
          )}
        </Flex>
      </label>
    </Flex>
  );

  const modalRejectArticle = (
    <ModalComponent
      cancelText={<Text className="font-roboto-slab">batal</Text>}
      okText={<Text className="font-roboto-slab hover:text-white transition-all duration-300">Tolak</Text>}
      open={rejectedModal.isOpen}
      onCancel={() => setRejectedModal((prev) => ({ ...prev, isOpen: false }))}
      onOk={handleConfirmRejectArticle}
      title={
        <Flex align="center" gap="small">
          <MdInfo className="text-yellow-500 text-2xl " />
          <Text className="font-roboto-slab text-base">Tolak Artikel</Text>
        </Flex>
      }
    >
      {modalContentRejectArticle}
    </ModalComponent>
  );

  return (
    <Group
      id="floating-button-group-admin-article-preview"
      icon={<PiDotsNineBold />}
      trigger="click"
      className=" bottom-5 z-[3]"
      open={isFloatingButtonOpen}
      onClick={() => setIsFloatingButtonOpen(!isFloatingButtonOpen)}
    >
      {modalRejectArticle}
      {acceptArticleModalContext}
      <FloatButtonWithTooltip
        handleClick={handleConfirm}
        icon={<PiCheckBold className="text-[#58942e]" />}
        title="terima artikel"
        id="floating-button-accept"
      />
      <FloatButtonWithTooltip
        handleClick={handleOpenModalRejectArticle}
        icon={<SlClose className="text-red-500" />}
        title="tolak artikel"
        id="floating-button-reject"
      />
      <FloatButtonWithTooltip
        handleClick={() => navigate("/dashboard-admin/persetujuan-artikel")}
        icon={<AiOutlineRollback className="text-[#84bf48]" />}
        title="kembali"
        id="floating-button-back"
      />
    </Group>
  );
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
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  isHidden: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  tooltipClassName: PropTypes.string,
};
