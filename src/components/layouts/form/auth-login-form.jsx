import { Alert, Flex, Input, Typography } from "antd";
import PropTypes from "prop-types";
import ButtonComponent from "../../ui/button-component";
import { myThemeConfigs } from "../../../theme/antd-theme";

const { Title, Text } = Typography;

const AuthLoginForm = ({
  handleSubmit,
  handleGoToRegister,
  handleGoToForgotPassword,
  handleInputChange,
  inputEmailValue,
  inputPasswordValue,
  errorMessage,
}) => {
  return (
    <form className="min-w-full  p-3" onSubmit={handleSubmit}>
      <div className="w-full mb-5">
        <Title level={4} className="font-special-elite  capitalize">
          masuk
        </Title>
        <Text className="font-roboto-slab ">
          Selamat datang kembali, {"<"}MatchaCoders!🍵/{">"}
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
        <label htmlFor="email" className="font-roboto-slab capitalize" style={{ color: myThemeConfigs.token.colorText }}>
          email
        </label>
        <Input
          value={inputEmailValue}
          onChange={handleInputChange}
          id="email"
          size="large"
          type="email"
          name="email"
          className="w-full"
        />
      </div>

      <div className="w-full mt-3">
        <label htmlFor="password" style={{ color: myThemeConfigs.token.colorText }} className="font-roboto-slab capitalize mt-3">
          password
        </label>
        <Input.Password
          value={inputPasswordValue}
          onChange={handleInputChange}
          size="large"
          name="password"
          id="password"
          className="w-full"
        />
      </div>

      <Flex className="w-full mt-3 flex flex-wrap justify-between">
        <Text className="font-roboto-slab text-xs  ">
          belum punya akun?{" "}
          <span className="underline cursor-pointer font-bold capitalize" onClick={handleGoToRegister}>
            buat akun
          </span>
        </Text>
        <Text className="font-roboto-slab text-xs ">
          lupa kata sandi?{" "}
          <span className="underline cursor-pointer font-bold capitalize" onClick={handleGoToForgotPassword}>
            klik disini
          </span>
        </Text>
      </Flex>

      <ButtonComponent type="primary" size="large" htmlType="submit" className="w-full mt-3 font-roboto-slab">
        masuk
      </ButtonComponent>
    </form>
  );
};

export default AuthLoginForm;

AuthLoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleGoToRegister: PropTypes.func,
  handleGoToForgotPassword: PropTypes.func,
  handleInputChange: PropTypes.func,
  inputEmailValue: PropTypes.string,
  inputPasswordValue: PropTypes.string,
  errorMessage: PropTypes.string,
};
