import { Flex, Input, message, Typography } from "antd";
import useUser from "../../../features/auth/hooks/use-user";
import ButtonComponent from "../../ui/button-component";
import { useState } from "react";
import useChangeUsername from "../../../features/profile/hooks/use-change-username";
import { IoIdCard } from "react-icons/io5";

const { Text } = Typography;
const EditProfileChangeUsername = () => {
  const { user } = useUser();
  const { handleChangeUsername } = useChangeUsername();
  const [messageApi, contextHolder] = message.useMessage();
  const [newName, setNewName] = useState(user?.displayName);

  const handleSetNewName = (event) => setNewName(event.target.value);
  const handleChangeUsernameButton = async () => {
    // validate
    if (!newName || newName.trim() === "") {
      messageApi.open({
        type: "warning",
        content: <Text className="font-roboto-slab capitalize text-xs">username tidak boleh kosong</Text>,
      });
      return;
    } else if (newName === user?.displayName) {
      messageApi.open({
        type: "warning",
        content: <Text className="font-roboto-slab capitalize text-xs">username tidak boleh sama dengan sebelumnya</Text>,
      });
      return;
    }

    // request
    const result = await handleChangeUsername(newName);
    if (result.success) {
      messageApi.open({
        type: "success",
        content: <Text className="font-roboto-slab capitalize text-xs">{result.message}</Text>,
      });

      // reload
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      messageApi.open({
        type: "error",
        content: <Text className="font-roboto-slab capitalize text-xs">{result.message}</Text>,
      });
    }
  };

  return (
    <div className=" border-b  bg-[#dcfab6] rounded-md p-3" style={{ boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)" }}>
      {contextHolder}
      <Text className="font-roboto-slab capitalize text-sm font-medium">ubah username</Text>
      <Flex align="center" gap="middle" className="mt-3">
        <Input size="large" className="bg-[#fafff0]" type="text" value={newName} onChange={handleSetNewName} />
        <ButtonComponent
          icon={<IoIdCard />}
          onClick={handleChangeUsernameButton}
          className="w-[160px] bg-[#58942e] text-[#b8e986]  font-roboto-slab"
          type="primary"
        >
          ubah username
        </ButtonComponent>
      </Flex>
    </div>
  );
};

export default EditProfileChangeUsername;
