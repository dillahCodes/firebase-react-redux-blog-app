import { Layout } from "antd";
import { myThemeConfigs } from "../theme/antd-theme";
import { useNavigate } from "react-router-dom";
import useRegister from "../features/auth/hooks/use-register";
import { useEffect, useState } from "react";
import AuthRegisterForm from "../components/layouts/form/auth-register-form";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleUserRegister } = useRegister();

  const [authRegisterFormValue, setAuthRegisterFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    errorMessage &&
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
  }, [errorMessage]);

  const handleAuthRegisterFormChange = (e) => {
    setAuthRegisterFormValue({ ...authRegisterFormValue, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const resultRegister = await handleUserRegister(
      authRegisterFormValue.email,
      authRegisterFormValue.password,
      authRegisterFormValue.userName,
      authRegisterFormValue.confirmPassword,
      setErrorMessage
    );

    resultRegister && navigate("/login");
  };

  return (
    <Layout className="min-h-screen flex items-center justify-center min-w-[320px]">
      <div
        className={`max-w-screen-sm w-full  rounded-md  `}
        style={{ border: "2px solid", borderColor: myThemeConfigs.token.colorText }}
      >
        <AuthRegisterForm
          handleSubmit={handleRegister}
          errorMessage={errorMessage}
          handleGoToLogin={() => navigate("/login")}
          handleInputChange={handleAuthRegisterFormChange}
          inputEmailValue={authRegisterFormValue.email}
          inputPasswordValue={authRegisterFormValue.password}
          inputConfirmPasswordValue={authRegisterFormValue.confirmPassword}
          inputUserNameValue={authRegisterFormValue.userName}
        />
      </div>
    </Layout>
  );
};

export default RegisterPage;
