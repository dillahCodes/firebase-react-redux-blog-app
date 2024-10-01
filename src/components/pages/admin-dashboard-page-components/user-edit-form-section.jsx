import classNames from "classnames";
import { myThemeConfigs } from "../../../theme/antd-theme";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import { Flex, Layout, message, Select, Typography } from "antd";
import { RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import useUpdateUserRole from "../../../features/admin/hooks/use-update-user-role";

const { Title, Text } = Typography;

const options = [
  {
    value: "user",
    label: "user",
  },
  {
    value: "admin",
    label: "admin",
  },
];
const UserEditFormSection = () => {
  const edituserdata = useSelector((state) => state.editUser.userData);
  const { screenWidth } = useDetectClientScreenWidth();
  const { handleUpdateUserRole } = useUpdateUserRole();

  const [messageApi, contextHolder] = message.useMessage();

  const handleChangeSelectUserRole = async (value) => {
    const result = await handleUpdateUserRole(edituserdata.doc_id, value);

    if (result.success) {
      messageApi.open({
        type: "success",
        content: <Text className="font-roboto-slab capitalize text-sm">{result?.message}</Text>,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: <Text className="font-roboto-slab capitalize text-sm">{result?.message}</Text>,
      });
    }
  };

  return (
    <aside
      style={myThemeConfigs.siderBorderStyle}
      className={classNames("  rounded-md p-3 bg-[#b8e986]", {
        "max-w-xs w-full sticky top-0": screenWidth > 930,
        "max-w-[19rem] w-full sticky top-0": screenWidth <= 930 && screenWidth > 848,
        "max-w-[18rem] w-full ": screenWidth < 848 && screenWidth > 785,
        "w-full ": screenWidth <= 785,
      })}
    >
      {contextHolder}
      <Layout className="w-full bg-transparent">
        <Title level={5} className="capitalize flex items-center gap-x-2 font-roboto-slab mb-3">
          <span className="text-lg">
            <RiEdit2Fill />
          </span>
          edit user
        </Title>

        {/* form */}
        <form>
          <Flex vertical>
            <Text className="font-roboto-slab">user role:</Text>
            {edituserdata?.role && (
              <Select
                className="w-full"
                defaultValue={edituserdata?.role}
                style={{
                  width: 120,
                }}
                onChange={handleChangeSelectUserRole}
                options={options}
              />
            )}
          </Flex>
        </form>
      </Layout>
    </aside>
  );
};

export default UserEditFormSection;
