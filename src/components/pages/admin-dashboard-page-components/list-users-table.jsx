import { Table, Tooltip, Input, message, Typography } from "antd";
import { MdChat, MdEdit } from "react-icons/md";
import { FaBan } from "react-icons/fa";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import useAdminGetUsersList from "../../../features/admin/hooks/use-get-users-list";
import { myThemeConfigs } from "../../../theme/antd-theme";
import PropTypes from "prop-types";
import useUser from "../../../features/auth/hooks/use-user";

const ListUserTable = () => {
  const { handleGetUsers, users, fetchStatus } = useAdminGetUsersList();
  const [userName, setUserName] = useState("");

  // Debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetUsers = useCallback(debounce(handleGetUsers, 1000), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    debouncedGetUsers(value);
  };

  const columns = createColumns();

  return (
    <div className="w-full flex flex-col gap-y-5">
      <SearchBar userName={userName} onInputChange={handleInputChange} />
      <UserTable loading={fetchStatus.isLoading} columns={columns} data={users} />
    </div>
  );
};

// search bar component
const SearchBar = ({ userName, onInputChange }) => (
  <div className="w-full px-3 rounded-md bg-[#b8e986]" style={myThemeConfigs.buttonBorderList}>
    <div className="w-full flex items-center justify-between flex-wrap pb-3">
      <h2 className="capitalize font-roboto-slab my-3">cari pengguna</h2>
      <Input
        value={userName}
        onChange={onInputChange}
        placeholder="masukan nama pengguna"
        className="placeholder:capitalize placeholder:font-roboto-slab placeholder:text-sm"
        size="large"
        type="text"
        style={{ boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)" }}
      />
    </div>
  </div>
);

SearchBar.propTypes = {
  userName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

// format data for table
const formatUserData = (users) =>
  users?.map((user) => ({
    key: user.doc_id,
    user_id: user.user_id,
    nama: user.name,
    email: user.email,
    role: user.role,
    pengikut: user.followers,
    artikel: user.articles,
  })) || [];

// user table component
const UserTable = ({ loading, columns, data }) => (
  <div className="w-full px-3 rounded-md bg-[#b8e986]" style={myThemeConfigs.buttonBorderList}>
    <div className="w-full flex items-center justify-between flex-wrap">
      <h2 className="capitalize font-roboto-slab my-3">daftar pengguna</h2>
    </div>
    <Table
      loading={loading}
      columns={columns}
      dataSource={formatUserData(data)}
      scroll={{ x: "max-content" }}
      className="pb-3"
      pagination={false}
    />
  </div>
);

UserTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

// create columns for table
const ColumnTitle = ({ title }) => <p className="m-0 capitalize font-roboto-slab">{title}</p>;
const ColumnContent = ({ text }) => <p className="font-roboto-slab m-0 h-full">{text}</p>;

ColumnTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
ColumnContent.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// column data for table
const createColumns = () => [
  {
    title: <ColumnTitle title="nama" />,
    dataIndex: "nama",
    key: "nama",
    render: (text) => <ColumnContent text={text} />,
    fixed: "left",
  },
  {
    title: <ColumnTitle title="email" />,
    dataIndex: "email",
    key: "email",
    render: (text) => <ColumnContent text={text} />,
  },
  {
    title: <ColumnTitle title="role" />,
    dataIndex: "role",
    key: "role",
    render: (text) => <ColumnContent text={text} />,
  },
  {
    title: <ColumnTitle title="Total pengikut" />,
    dataIndex: "pengikut",
    key: "pengikut",
    render: (text) => <ColumnContent text={text} />,
  },
  {
    title: <ColumnTitle title="Total artikel" />,
    dataIndex: "artikel",
    key: "artikel",
  },
  {
    title: <ColumnTitle title="aksi" />,
    dataIndex: "aksi",
    key: "aksi",
    render: (_, record) => <ActionButtons userName={record.nama} user_id={record.user_id} />,
  },
];

// action buttons
const { Text } = Typography;
const ActionButtons = ({ userName, user_id }) => {
  const { user } = useUser();
  const { handleNavigateForEditUser } = useAdminGetUsersList();
  const [messageApi, messageContextHolder] = message.useMessage();

  const handleAction = (type) => {
    const actionMessages = {
      "edit-profile": "mengedit profil",
      "banned-user": "membanned",
      "message-user": "menghubungi",
    };

    const actionMessage = actionMessages[type] || "mengedit profil";

    // validate
    const isSelf = user?.uid === user_id;
    if (isSelf) {
      messageApi.open({
        type: "warning",
        content: <Text className="font-roboto-slab capitalize text-xs">anda tidak dapat {actionMessage} diri sendiri</Text>,
      });
      return;
    }

    // handle request
    switch (type) {
      case "edit-profile":
        handleNavigateForEditUser(user_id, userName);
        break;

      // case "banned-user":
      // case "message-user":
      //   messageApi.open({
      //     type: "warning",
      //     content: <Text className="font-roboto-slab capitalize text-xs">aksi ini tidak tersedia</Text>,
      //   });
      //   break;

      default:
        messageApi.open({
          type: "warning",
          content: <Text className="font-roboto-slab capitalize text-xs">aksi ini tidak tersedia</Text>,
        });
        break;
    }
  };

  return (
    <div className="flex gap-x-3">
      {messageContextHolder}
      <TooltipButton onClick={() => handleAction("message-user")} icon={<MdChat />} tooltip="Hubungi pengguna" color="#b8e986" />
      <TooltipButton
        icon={<MdEdit className="text-[#b8e986]" />}
        tooltip="Edit pengguna"
        color="#58942e"
        onClick={() => handleAction("edit-profile")}
      />
      <TooltipButton
        onClick={() => handleAction("banned-user")}
        icon={<FaBan className="text-[#fafff0]" />}
        tooltip="Banned pengguna"
        color="red"
      />
    </div>
  );
};
ActionButtons.propTypes = {
  userName: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
};

// tooltip button action
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

export default ListUserTable;
