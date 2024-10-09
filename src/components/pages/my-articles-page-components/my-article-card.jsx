import { Button, Dropdown, Flex, Typography } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline, IoEyeOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import useHandleArticleOptions from "../../../features/myarticle/hooks/use-handle-article-options";
import usePreviewArticle from "../../../features/myarticle/hooks/use-preview-article";
import { myThemeConfigs } from "../../../theme/antd-theme";
import withModal from "../../hoc/with-modal";
import ButtonComponent from "../../ui/button-component";
import { useMyArticlesPage } from "./context/my-articles-page-context";

const { Text, Title } = Typography;
const MyArticleCard = ({ articleId }) => {
  const { state } = useMyArticlesPage();
  const { handlePreviewArticle } = usePreviewArticle();
  const title = state.articleData?.find((article) => article.doc_id === articleId)?.title;
  const status = state.articleData?.find((article) => article.doc_id === articleId)?.reviewStatus;
  const rejectedReason = state.articleData?.find((article) => article.doc_id === articleId)?.reasonRejected;

  return (
    <div
      className={classNames(" h-[120px]  w-full  relative border rounded-md border-black bg-[#dcfab6] p-2", {
        "max-w-sm": state.articleData.length < 2,
        "sm:flex-[1_30%] md:flex-[1_25%] lg:flex-[1_16%]": state.articleData.length >= 2,
      })}
      style={myThemeConfigs.siderBorderStyle}
    >
      {/* content */}
      <Flex vertical className="h-full" justify="space-between">
        <Flex justify="space-around">
          {/* title */}
          <Title
            onClick={() => handlePreviewArticle(articleId)}
            className="line-clamp-2 font-roboto-slab hover:underline cursor-pointer"
            level={5}
          >
            {title}
          </Title>

          {/* dropdown */}
          <Button className="ml-auto bg-transparent p-1  border-none shadow-none">
            <CardDropdown articleId={articleId} />
          </Button>
        </Flex>

        {/* status */}
        <StatusCard status={status} reasonRejected={rejectedReason} />
      </Flex>
    </div>
  );
};

export default MyArticleCard;

MyArticleCard.propTypes = {
  articleId: PropTypes.string.isRequired,
};

const CardDropdownMenu = ({ articleId, comingSoonHandler, handleDeleteArticle, handleEditArticle }) => {
  const { handlePreviewArticle } = usePreviewArticle();

  return [
    {
      label: <LabelOptions onClick={() => handleDeleteArticle(articleId)} icon={<FaRegTrashAlt />} text="Hapus" />,
      key: "menu-1",
    },
    {
      label: <LabelOptions onClick={() => handleEditArticle(articleId)} icon={<AiOutlineEdit />} text="Edit" />,
      key: "menu-2",
    },
    {
      label: <LabelOptions onClick={() => handlePreviewArticle(articleId)} icon={<IoEyeOutline />} text="Lihat" />,
      key: "menu-3",
    },
    {
      label: <LabelOptions onClick={() => comingSoonHandler("Info")} icon={<BsInfoCircle />} text="info" />,
      key: "menu-4",
    },
  ];
};

const CardDropdown = ({ articleId }) => {
  const { handleDeleteArticle, optiosModalArticleContextHolder, comingSoonHandler, messageContextHolder, handleEditArticle } =
    useHandleArticleOptions();

  return (
    <>
      {optiosModalArticleContextHolder}
      {messageContextHolder}
      <Dropdown
        arrow
        trigger={["click"]}
        menu={{
          items: CardDropdownMenu({ articleId, comingSoonHandler, handleDeleteArticle, handleEditArticle }),
        }}
      >
        <span>
          <BsThreeDotsVertical />
        </span>
      </Dropdown>
    </>
  );
};

CardDropdown.propTypes = {
  articleId: PropTypes.string.isRequired,
};
const LabelOptions = ({ icon, text, ...props }) => {
  return (
    <Text className="text-xs font-roboto-slab flex items-center gap-3" {...props}>
      <span>{icon}</span>
      <span>{text}</span>
    </Text>
  );
};

LabelOptions.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

const TextWithModal = withModal(Text);
const StatusCard = ({ status, reasonRejected }) => {
  const iconCondition = (status) => {
    switch (status) {
      case "pending":
        return <MdAccessTime className="text-base" />;
      case "approved":
        return <IoIosCheckmarkCircleOutline className="text-base" />;
      case "rejected":
        return <IoCloseCircleOutline className="text-base" />;
      default:
        return <IoIosCheckmarkCircleOutline />;
    }
  };

  const textCondition = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "diterima";
      case "rejected":
        return "ditolak";
      default:
        return "Pending";
    }
  };

  return (
    <Flex align="center" gap="middle">
      <ButtonComponent
        icon={iconCondition(status)}
        size="small"
        type={status === "accepted" ? "primary" : "default"}
        className={classNames("flex items-center rounded-full group transition-all duration-300 font-roboto-slab w-fit", {
          "bg-yellow-100 text-yellow-600": status === "pending",
          "bg-red-100 text-red-700": status === "rejected",
          "bg-[#b8e986] text-green-700": status === "approved",
        })}
      >
        <Text
          className={classNames("font-roboto-slab text-xs  capitalize transition-all duration-300", {
            "text-yellow-600 ": status === "pending",
            "text-red-700": status === "rejected",
            "text-green-700": status === "approved",
          })}
        >
          {textCondition(status)}
        </Text>
      </ButtonComponent>

      {status === "rejected" && (
        <TextWithModal
          modalTitle={
            <Title className="p-2" level={5}>
              Alasan Penolakan
            </Title>
          }
          modalContent={
            <div className="p-2">
              <Text>{reasonRejected}</Text>
            </div>
          }
          className={classNames("font-roboto-slab text-[10px] underline capitalize cursor-pointer  transition-all duration-300", {
            "text-red-700": status === "rejected",
          })}
        >
          alasan penolakan
        </TextWithModal>
      )}
    </Flex>
  );
};

StatusCard.propTypes = {
  status: PropTypes.string,
  reasonRejected: PropTypes.string,
};
