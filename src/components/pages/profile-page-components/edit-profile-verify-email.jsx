import { Flex, Input, message, Typography } from "antd";
import useUser from "../../../features/auth/hooks/use-user";
import ButtonComponent from "../../ui/button-component";
import useVerifyUserEmail from "../../../features/profile/hooks/use-verify-user-email";
import { MdVerifiedUser } from "react-icons/md";

const { Text } = Typography;
const EditProfileVerifyEmail = () => {
  const { user } = useUser();
  const { handleSendVerificationEmail } = useVerifyUserEmail();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSendVerificationEmailButton = () => {
    const result = handleSendVerificationEmail();

    if (result) {
      messageApi.open({
        type: "success",
        content: <Text className="font-roboto-slab capitalize text-xs">email verifikasi berhasil dikirim</Text>,
      });
    } else {
      messageApi.open({
        type: "error",
        content: (
          <Text className="font-roboto-slab capitalize text-xs">gagal mengirim email verifikasi, silahkan coba lagi</Text>
        ),
      });
    }
  };

  return (
    <div className=" border-b  bg-[#dcfab6] rounded-md p-3" style={{ boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)" }}>
      {contextHolder}
      <Text className="font-roboto-slab capitalize text-sm font-medium">verifikasi email</Text>
      <Flex align="center" gap="middle" className="mt-3">
        <Input size="large" className="bg-[#fafff0]" type="text" value={user?.email} />
        <Text className="font-roboto-slab capitalize text-sm font-medium min-w-fit">
          {user.emailVerified ? "verified ✅" : "unverified ❌"}
        </Text>
      </Flex>
      <ButtonComponent
        disabled={user?.emailVerified}
        onClick={handleSendVerificationEmailButton}
        icon={<MdVerifiedUser />}
        className="mt-2 bg-[#58942e] text-[#b8e986]  font-roboto-slab"
        type="primary"
      >
        kirim verifikasi
      </ButtonComponent>
    </div>
  );
};

export default EditProfileVerifyEmail;
