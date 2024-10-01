import { Flex, Layout, message, Typography } from "antd";
import Breadcrumbs from "../../ui/breadcrumbs";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import MainLayout from "../../layouts/main-layout";
import classNames from "classnames";
import { useEffect } from "react";
import SiderAdmin from "../../layouts/sider/sider-admin";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserEditInfoSection from "./user-edit-info-section";
import UserEditFormSection from "./user-edit-form-section";
import useAdminGetUsersList from "../../../features/admin/hooks/use-get-users-list";

const { Content } = Layout;
const { Text } = Typography;
const SectionUserEdit = () => {
  const { screenWidth } = useDetectClientScreenWidth();
  const { handleGetUserWithUserId } = useAdminGetUsersList();
  const navigate = useNavigate();

  // params
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const handleGetUserWithParamsId = async () => {
      const result = await handleGetUserWithUserId(userId);
      if (!result.success || !userId) {
        messageApi.open({
          type: "error",
          content: <Text className="font-roboto-slab capitalize text-sm">{result?.message}</Text>,
        });
        // navigate if user not found
        setTimeout(() => {
          navigate("/dashboard-admin/daftar-pengguna", {
            replace: true,
          });
        }, 500);
      }
    };
    handleGetUserWithParamsId();
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      {contextHolder}
      <Flex align="flex-start" className="w-full min-h-screen">
        {screenWidth > 1120 && <SiderAdmin />}
        <Content
          className={classNames("w-full p-5  h-full overflow-y-auto", {
            "px-3": screenWidth <= 500,
          })}
        >
          {/* breadcrumb navigation */}
          <div className="w-full pl-1">
            <Breadcrumbs />
          </div>
          <Flex
            gap="middle"
            wrap={screenWidth <= 785 && "wrap-reverse"}
            align="flex-start"
            className={classNames("mx-auto  mt-5 pl-1", {
              "max-w-screen-lg": screenWidth > 930,
              "max-w-[35rem]": screenWidth <= 784,
            })}
          >
            <UserEditFormSection />
            <UserEditInfoSection />
          </Flex>
        </Content>
      </Flex>
    </MainLayout>
  );
};

export default SectionUserEdit;

["dashboard-admin", "edit-pengguna"];
