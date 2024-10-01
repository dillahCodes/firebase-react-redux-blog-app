import { Flex, Input, Table, Tooltip, Typography } from "antd";
import { myThemeConfigs } from "../../../theme/antd-theme";
import PropTypes from "prop-types";
import { MdCheck, MdClose, MdInfo } from "react-icons/md";
import truncateString from "../../../utils/truncate-string";
import formatEpochToIndonesianDate from "../../../utils/convert-time";
import useGetArticlePending from "../../../features/admin/hooks/use-get-article-pending";
import useRejectArticleList from "../../../features/admin/hooks/use-reject-article-list";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";
import ModalComponent from "../../ui/modal-component";
import useAdminPreviewArticle from "../../../features/admin/hooks/use-admin-preview-article";
import { usePreviewAdminArticleContext } from "./context/preview-article-context";
import PreviewArticleAdmin from "./preview-article-admin";
import useAcceptArticle from "../../../features/admin/hooks/use-accept-article";

const { Text } = Typography;
const ArticleWaitAccTable = () => {
  const { tableData, fetchPendingArticles } = useGetArticlePending();
  const { state } = usePreviewAdminArticleContext();
  const { is_admin_preview_article_active } = state;

  return (
    <div className="w-full flex flex-col gap-y-5">
      {is_admin_preview_article_active ? (
        <PreviewArticleAdmin />
      ) : (
        <ArticleListTable
          loading={tableData.isLoading}
          columns={createColumns()}
          data={tableData.data}
          pageSize={tableData.pageSize}
          onLoadMore={() => fetchPendingArticles(tableData.lastVisibleDoc)}
          total={tableData.totalArticles}
        />
      )}
    </div>
  );
};

export default ArticleWaitAccTable;

/**
 * Table untuk menampilkan daftar artikel yang menunggu konfirmasi admin.
 * Table ini memiliki pagination dan dapat di-scroll secara horizontal.
 * Properti yang diperlukan adalah loading, columns, data, onLoadMore, total, dan pageSize.
 * @param {boolean} loading - status loading tabel
 * @param {array} columns - kolom-kolom yang akan ditampilkan di tabel
 * @param {array} data - data artikel yang akan ditampilkan di tabel
 * @param {function} onLoadMore - fungsi yang akan dijalankan ketika pengguna mengklik tombol "Muat Lebih Banyak"
 * @param {number} total - jumlah artikel yang tersedia
 * @param {number} pageSize - jumlah artikel yang ditampilkan di setiap halaman
 */
const ArticleListTable = ({ loading, columns, data, onLoadMore, total, pageSize }) => (
  <div className="w-full px-3 rounded-md bg-[#b8e986]" style={myThemeConfigs.buttonBorderList}>
    <div className="w-full flex items-center justify-between flex-wrap">
      <h2 className="capitalize font-roboto-slab my-3">daftar artikel</h2>
    </div>
    <Table
      loading={loading}
      columns={columns}
      dataSource={formatUserData(data)}
      scroll={{ x: "max-content" }}
      className="pb-3"
      pagination={{
        pageSize: pageSize,
        total: total,
        onChange: (page) => onLoadMore(page),
      }}
    />
  </div>
);

ArticleListTable.propTypes = {
  loading: PropTypes.bool,
  columns: PropTypes.array,
  data: PropTypes.array,
  onLoadMore: PropTypes.func,
  total: PropTypes.number,
  pageSize: PropTypes.number,
};

/**
 * @function ColumnTitle
 * @description create title for column
 * @param {object} props - props of component
 * @param {string} props.title - title of column
 * @returns {ReactElement} title of column
 */
const ColumnTitle = ({ title }) => <p className="m-0 capitalize font-roboto-slab">{title}</p>;

/**
 * @function ColumnContent
 * @description create content for column
 * @param {object} props - props of component
 * @param {string|number} props.text - content of column
 * @returns {ReactElement} content of column
 */
const ColumnContent = ({ text }) => <p className="font-roboto-slab m-0 h-full">{text}</p>;

ColumnTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
ColumnContent.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * ActionButtons is a component that renders a button group for each article in the article list
 * table. The buttons are:
 * - Terima Artikel: This button is used to accept the article and it will be displayed in the
 *   article list table.
 * - Tolak Artikel: This button is used to reject the article and it will be removed from the
 *   article list table.
 * - Lihat Artikel: This button is used to view the article and it will be displayed in a modal
 *   window.
 *
 * @param {string} articleId - The id of the article.
 * @returns {JSX.Element} - A JSX element that renders the button group.
 */

const ActionButtons = ({ articleId }) => {
  const { handleAdminPreviewArticle } = useAdminPreviewArticle();
  const { handleRejectArticle } = useRejectArticleList();
  const { handleAcceptArticle, acceptArticleModalContext } = useAcceptArticle();
  const [rejectedModal, setRejectedModal] = useState({
    isOpen: false,
    rejectedMessage: "",
    isInputMessageError: false,
  });
  const isValidMessage = rejectedModal.rejectedMessage.trim() !== "" && rejectedModal.isInputMessageError !== "";

  const handleInputRejectedMessage = (e) => {
    isValidMessage && setRejectedModal((prev) => ({ ...prev, isInputMessageError: false }));
    setRejectedModal((prev) => ({ ...prev, rejectedMessage: e.target.value }));
  };

  const handleOnOk = () => {
    if (!isValidMessage) {
      setRejectedModal((prev) => ({ ...prev, isInputMessageError: true }));
      return;
    }

    handleRejectArticle(articleId, rejectedModal.rejectedMessage);
    setRejectedModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOncancel = () => {
    setRejectedModal((prev) => ({ ...prev, isOpen: false }));
    setRejectedModal((prev) => ({ ...prev, rejectedMessage: "" }));
  };

  const handleAction = (type) => {
    switch (type) {
      case "accepted":
        handleAcceptArticle(articleId);
        break;
      case "rejected":
        setRejectedModal((prev) => ({ ...prev, isOpen: true }));
        break;

      case "view":
        handleAdminPreviewArticle(articleId);
        break;

      default:
        break;
    }
  };

  const modalContentRejectArticle = (
    <div className="pl-8">
      <Flex vertical gap={"large"}>
        <Text className="font-roboto-slab text-sm">Apakah anda yakin ingin menolak artikel ini?</Text>
        <label htmlFor="reason">
          <Text className="font-roboto-slab text-sm">Alasan:</Text>
          <Flex vertical>
            <Input.TextArea
              status={rejectedModal.isInputMessageError ? "error" : null}
              id="reason"
              onChange={handleInputRejectedMessage}
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
    </div>
  );

  const modalRejectArticle = (
    <ModalComponent
      cancelText={<Text className="font-roboto-slab">batal</Text>}
      okText={<Text className="font-roboto-slab hover:text-white transition-all duration-300">Tolak</Text>}
      open={rejectedModal.isOpen}
      onCancel={handleOncancel}
      onOk={handleOnOk}
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
    <>
      {rejectedModal.isOpen && modalRejectArticle}
      {acceptArticleModalContext}
      <div className="flex gap-x-3">
        <TooltipButton onClick={() => handleAction("accepted")} icon={<MdCheck />} tooltip="Terima Artikel" color="#b8e986" />
        <TooltipButton
          onClick={() => handleAction("rejected")}
          icon={<MdClose className="text-[#fafff0]" />}
          tooltip="Tolak Artikel"
          color="red"
        />
        <TooltipButton onClick={() => handleAction("view")} icon={<IoMdEye />} tooltip="lihat artikel" color="#dcfab6" />
      </div>
    </>
  );
};

ActionButtons.propTypes = {
  articleId: PropTypes.string.isRequired,
};

/**
 * @function
 * @description A simple button wrapped in an antd Tooltip component.
 * @param {JSX.Element} icon The icon to be displayed in the button.
 * @param {string} tooltip The text to be displayed as the tooltip.
 * @param {string} color The background color of the button.
 * @param {function} onClick The function to be called when the button is clicked.
 * @returns {JSX.Element} The JSX element representing the button with a tooltip.
 */
const TooltipButton = ({ icon, tooltip, color, onClick }) => (
  <Tooltip
    title={<p className="mb-0 capitalize font-roboto-slab text-xs text-[#58942e]">{tooltip}</p>}
    color="#fafff0"
    mouseEnterDelay={0.5}
  >
    <button
      onClick={onClick}
      className="capitalize flex items-center cursor-pointer font-roboto-slab p-2 px-3 text-lg rounded-sm"
      style={{ backgroundColor: color, ...myThemeConfigs.buttonBorderList }}
    >
      {icon}
    </button>
  </Tooltip>
);

TooltipButton.propTypes = {
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

/**
 * @function
 * @description Format data for table.
 * @param {object[]} articlesData The data from firebase.
 * @returns {object[]} The formatted data.
 */
const formatUserData = (articlesData) =>
  articlesData.map((article) => ({
    key: article.id,
    "nama pengguna": article.author_name || `User`,
    email: article.author_email || `User`,
    artikel: truncateString(article.title, 40),
    tanggal: article.createdAt ? formatEpochToIndonesianDate(article.createdAt.seconds) : "unknown date",
    doc_id: article.doc_id,
  }));

// column data for table
/**
 * Create column data for the table.
 * @returns {Array} The column data for the table.
 */
const createColumns = () => [
  {
    /**
     * The title of the column.
     * @type {JSX.Element}
     */
    title: <ColumnTitle title="nama pengguna" />,
    /**
     * The data key of the column.
     * @type {string}
     */
    dataIndex: "nama pengguna",
    /**
     * The key of the column.
     * @type {string}
     */
    key: "nama pengguna",
    /**
     * The render function of the column.
     * @param {string} text The text to be displayed.
     * @returns {JSX.Element} The JSX element to be rendered.
     */
    render: (text) => <ColumnContent text={text} />,
    /**
     * The fixed position of the column.
     * @type {string}
     */
    fixed: "left",
  },
  {
    title: <ColumnTitle title="artikel" />,
    dataIndex: "artikel",
    key: "artikel",
    render: (text) => <ColumnContent text={text} />,
  },
  {
    title: <ColumnTitle title="tanggal" />,
    dataIndex: "tanggal",
    key: "tanggal",
    render: (text) => <ColumnContent text={text} />,
  },
  {
    title: <ColumnTitle title="aksi" />,
    dataIndex: "aksi",
    key: "aksi",
    /**
     * The render function of the column.
     * @param {object} _ The unused parameter.
     * @param {object} record The data record.
     * @returns {JSX.Element} The JSX element to be rendered.
     */
    render: (_, record) => <ActionButtons articleId={record.doc_id} />,
  },
];
