import { Alert, Flex, Input, Typography } from "antd";
import PropTypes from "prop-types";
import ButtonComponent from "../../ui/button-component";
import { myThemeConfigs } from "../../../theme/antd-theme";

const { Title, Text } = Typography;

const AuthRegisterForm = ({
  handleSubmit,
  handleGoToLogin,
  handleInputChange,
  inputUserNameValue,
  inputEmailValue,
  inputPasswordValue,
  inputConfirmPasswordValue,
  errorMessage,
}) => {
  return (
    <form className="min-w-full  p-3" onSubmit={handleSubmit}>
      <div className="w-full mb-5">
        <Title level={4} className="font-special-elite  capitalize">
          daftar
        </Title>
        <Text className="font-roboto-slab ">
          Hi User, Mari Bergabung Bersama {"<"}MatchaCoders!🍵/{">"}
        </Text>
      </div>

      {errorMessage && (
        <Alert
          message={errorMessage}
          className="mb-5 flex items-center text-red-500 text-sm capitalize font-roboto-slab"
          type="error"
          showIcon
        />
      )}

      <div className="w-full">
        <label htmlFor="userName" className="font-roboto-slab capitalize" style={{ color: myThemeConfigs.token.colorText }}>
          username
          <span className="text-red-500">*</span>
        </label>
        <Input
          value={inputUserNameValue}
          onChange={handleInputChange}
          id="userName"
          name="userName"
          size="large"
          type="text"
          className="w-full"
        />
      </div>

      <div className="w-full mt-3">
        <label htmlFor="email" className="font-roboto-slab capitalize" style={{ color: myThemeConfigs.token.colorText }}>
          email
          <span className="text-red-500">*</span>
        </label>
        <Input
          value={inputEmailValue}
          onChange={handleInputChange}
          id="email"
          name="email"
          size="large"
          type="email"
          className="w-full"
        />
      </div>

      <div className="w-full mt-3">
        <label
          htmlFor="password"
          className="font-roboto-slab capitalize mt-3"
          style={{ color: myThemeConfigs.token.colorText }}
        >
          password
          <span className="text-red-500">*</span>
        </label>
        <Input.Password
          value={inputPasswordValue}
          onChange={handleInputChange}
          size="large"
          id="password"
          name="password"
          className="w-full"
        />
      </div>

      <div className="w-full mt-3">
        <label
          htmlFor="confirm-password"
          className="font-roboto-slab capitalize mt-3"
          style={{ color: myThemeConfigs.token.colorText }}
        >
          konfirmasi password
          <span className="text-red-500">*</span>
        </label>
        <Input.Password
          value={inputConfirmPasswordValue}
          onChange={handleInputChange}
          size="large"
          id="confirm-password"
          name="confirmPassword"
          className="w-full"
        />
      </div>

      <Flex className="w-full mt-3">
        <Text className="font-roboto-slab text-xs ">
          sudah punya akun?{" "}
          <span className="underline cursor-pointer font-bold capitalize" onClick={handleGoToLogin}>
            masuk
          </span>
        </Text>
      </Flex>

      <ButtonComponent type="primary" size="large" htmlType="submit" className="w-full mt-3 font-roboto-slab">
        Daftar
      </ButtonComponent>
    </form>
  );
};

export default AuthRegisterForm;

AuthRegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleGoToLogin: PropTypes.func,
  handleInputChange: PropTypes.func,
  inputUserNameValue: PropTypes.string,
  inputEmailValue: PropTypes.string,
  inputPasswordValue: PropTypes.string,
  inputConfirmPasswordValue: PropTypes.string,
  errorMessage: PropTypes.string,
};
