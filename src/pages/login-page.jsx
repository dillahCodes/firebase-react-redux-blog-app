import { Layout } from "antd";
import { myThemeConfigs } from "../theme/antd-theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogIn from "../features/auth/hooks/use-logIn";
import AuthLoginForm from "../components/layouts/form/auth-login-form";

const LogInPage = () => {
  const { handleUserLogIn } = useLogIn();
  const navigate = useNavigate();

  const [authLoginFormValue, setAuthLoginFormValue] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    errorMessage &&
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
  }, [errorMessage]);

  const handleAuthLoginFormChange = (e) => {
    setAuthLoginFormValue({ ...authLoginFormValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await handleUserLogIn(authLoginFormValue.email, authLoginFormValue.password, setErrorMessage);
  };

  return (
    <Layout className="min-h-screen flex items-center justify-center min-w-[320px]">
      <div
        className={`max-w-screen-sm w-full rounded-md `}
        style={{ border: "2px solid", borderColor: myThemeConfigs.token.colorText }}
      >
        <AuthLoginForm
          inputEmailValue={authLoginFormValue.email}
          inputPasswordValue={authLoginFormValue.password}
          handleInputChange={handleAuthLoginFormChange}
          errorMessage={errorMessage}
          handleSubmit={handleLogin}
          handleGoToForgotPassword={() => navigate("/lupa-password")}
          handleGoToRegister={() => navigate("/register")}
        />
      </div>
    </Layout>
  );
};

export default LogInPage;
