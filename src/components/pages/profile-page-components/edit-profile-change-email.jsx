import { Alert, Flex, Input, Typography } from "antd";
import ButtonComponent from "../../ui/button-component";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import useChangeEmail from "../../../features/profile/hooks/use-change-email";
import classNames from "classnames";
import { FaCheckCircle } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";

const { Text } = Typography;
const EditProfileChangeEmail = () => {
  const [formData, setFormData] = useState({
    newEmail: "",
    currentPassword: "",
  });

  //   costum hook
  const { handleChangeEmail, handleValidateInput, errors } = useChangeEmail(formData.newEmail, formData.currentPassword);
  const { newEmailErrorMessage, currPasswordErrorMessage, resultMessage } = errors;

  //   handle onchange state
  const handleInputOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   handle submit
  const handleSubmitChangeEmail = (event) => {
    event.preventDefault();

    // validate input
    const resultValidate = handleValidateInput();

    // final validation
    const isInputFieldError = resultValidate.isInputNewEmailError || resultValidate.isInputCurrPasswordError;
    if (isInputFieldError) return;
    else handleChangeEmail();
  };

  return (
    <div className=" border-b  bg-[#dcfab6] rounded-md p-3" style={{ boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)" }}>
      <Text className="font-roboto-slab capitalize text-sm font-medium">ubah email</Text>

      {resultMessage && (
        <Alert
          message={resultMessage}
          type="success"
          icon={<FaCheckCircle className="text-[#58942e]" />}
          showIcon
          className="mt-3 bg-[#b8e986] text-[#58942e] font-roboto-slab"
          closeIcon={<RiCloseLargeFill className="text-[#58942e]" />}
        />
      )}

      <form onSubmit={handleSubmitChangeEmail}>
        {/* new email */}
        <Flex vertical gap="middle" className="mt-3">
          <Flex vertical gap={3}>
            {newEmailErrorMessage && (
              <Text type="danger" className={classNames("font-roboto-slab  capitalize text-xs font-medium")}>
                {newEmailErrorMessage}
              </Text>
            )}
            <Input
              status={newEmailErrorMessage ? "error" : "default"}
              name="newEmail"
              size="large"
              type="email"
              value={formData.newEmail}
              onChange={handleInputOnChange}
              className={
                "bg-[#fafff0] font-roboto-slab placeholder:font-roboto-slab placeholder:text-sm placeholder:capitalize "
              }
              placeholder="email baru"
            />
          </Flex>

          {/* current password */}
          <Flex gap={3} vertical>
            {currPasswordErrorMessage && (
              <Text type="danger" className={classNames("font-roboto-slab  capitalize text-xs font-medium")}>
                {currPasswordErrorMessage}
              </Text>
            )}

            <Flex gap="middle" align="center">
              <Input.Password
                status={currPasswordErrorMessage ? "error" : "default"}
                value={formData.currentPassword}
                onChange={handleInputOnChange}
                name="currentPassword"
                size="large"
                type="text"
                className={
                  "bg-[#fafff0] font-roboto-slab placeholder:font-roboto-slab placeholder:text-sm placeholder:capitalize "
                }
                placeholder="password saat ini"
              />
              <ButtonComponent
                htmlType="submit"
                icon={<MdEmail />}
                className=" bg-[#58942e] text-[#b8e986] flex items-center font-roboto-slab"
                type="primary"
              >
                ubah email
              </ButtonComponent>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export default EditProfileChangeEmail;
