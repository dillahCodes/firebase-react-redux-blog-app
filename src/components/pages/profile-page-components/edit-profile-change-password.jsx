import { Flex, Input, message, Typography } from "antd";
import ButtonComponent from "../../ui/button-component";
import { FaLock } from "react-icons/fa";
import useChangePassword from "../../../features/profile/hooks/use-change-password";
import { useState } from "react";
import classNames from "classnames";
import useProfile from "../../../features/profile/hooks/use-profile";

const { Text } = Typography;
const EditProfileChangePassword = () => {
  const { handleChangeUserPassword } = useChangePassword();
  const [messageApi, contextHolder] = message.useMessage();
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const {
    setCurrentPasswordErrorState,
    currentPasswordErrorMessage,
    isCurrentPasswordError,

    setNewPasswordErrorState,
    newPasswordErrorMessage,
    isNewPasswordError,

    setConfirmPasswordErrorState,
    confirmPasswordErrorMessage,
    isConfirmPasswordError,
  } = useProfile(userPassword);

  // handle onchange state
  const handlePasswordOnChange = (event) => {
    const { name, value } = event.target;
    setUserPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeUserPasswordButton = () => {
    // validate password on button click
    const isCurrentPasswordEmpty = userPassword.currentPassword.trim() === "";
    const isNewPasswordEmpty = userPassword.newPassword.trim() === "";
    const isConfirmPasswordEmpty = userPassword.confirmPassword.trim() === "";

    if (isCurrentPasswordEmpty) setCurrentPasswordErrorState("harus diisi");
    if (isNewPasswordEmpty) setNewPasswordErrorState("harus diisi");
    if (isConfirmPasswordEmpty) setConfirmPasswordErrorState("harus diisi");

    // final validate
    const isInputPasswordError =
      isCurrentPasswordEmpty ||
      isNewPasswordEmpty ||
      isConfirmPasswordEmpty ||
      isCurrentPasswordError ||
      isNewPasswordError ||
      isConfirmPasswordError;

    if (isInputPasswordError) return;

    handleChangeUserPassword(userPassword.currentPassword, userPassword.newPassword).then((res) => {
      if (res.success) {
        messageApi.open({
          type: "success",
          content: <Text className="font-roboto-slab capitalize text-xs">password berhasil diperbarui</Text>,
        });
      }

      // show error message in input field
      if (!res.success && res.error.code === "auth/wrong-password") setCurrentPasswordErrorState("password lama salah");
    });
  };

  return (
    <div className=" border-b  bg-[#dcfab6] rounded-md p-3" style={{ boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)" }}>
      {contextHolder}
      <Text className="font-roboto-slab capitalize text-sm font-medium">ubah password</Text>
      <Flex align="center" vertical gap="middle" className="mt-3">
        {/* current password */}
        <Flex vertical className="w-full">
          {isCurrentPasswordError && (
            <Text type="danger" className={classNames("font-roboto-slab capitalize text-xs font-medium")}>
              {currentPasswordErrorMessage}
            </Text>
          )}
          <Input.Password
            value={userPassword.currentPassword}
            onChange={handlePasswordOnChange}
            status={isCurrentPasswordError ? "error" : "default"}
            name="currentPassword"
            size="large"
            type="text"
            className={
              "bg-[#fafff0] font-roboto-slab placeholder:font-roboto-slab placeholder:text-sm placeholder:capitalize placeholder:text-[#b8e986]"
            }
            placeholder="password saat ini"
          />
        </Flex>

        {/* new password */}
        <Flex vertical className="w-full">
          {isNewPasswordError && (
            <Text type="danger" className={classNames("font-roboto-slab  capitalize text-xs font-medium")}>
              {newPasswordErrorMessage}
            </Text>
          )}
          <Input.Password
            value={userPassword.newPassword}
            onChange={handlePasswordOnChange}
            name="newPassword"
            status={isNewPasswordError ? "error" : "default"}
            size="large"
            type="text"
            className={
              "bg-[#fafff0] font-roboto-slab placeholder:font-roboto-slab placeholder:text-sm placeholder:capitalize placeholder:text-[#b8e986]"
            }
            placeholder="password baru"
          />
        </Flex>

        {/* confirm password */}
        <Flex vertical className="w-full">
          {isConfirmPasswordError && (
            <Text type="danger" className={classNames("font-roboto-slab  capitalize text-xs font-medium")}>
              {confirmPasswordErrorMessage}
            </Text>
          )}
          <Input.Password
            value={userPassword.confirmPassword}
            onChange={handlePasswordOnChange}
            status={isConfirmPasswordError ? "error" : "default"}
            name="confirmPassword"
            size="large"
            type="text"
            className={
              "bg-[#fafff0] font-roboto-slab placeholder:font-roboto-slab placeholder:text-sm placeholder:capitalize placeholder:text-[#b8e986]"
            }
            placeholder="konfirmasi password baru"
          />
        </Flex>
      </Flex>

      <ButtonComponent
        onClick={handleChangeUserPasswordButton}
        icon={<FaLock />}
        className=" bg-[#58942e] text-[#b8e986]  font-roboto-slab mt-3"
        type="primary"
      >
        ubah password
      </ButtonComponent>
    </div>
  );
};

export default EditProfileChangePassword;
