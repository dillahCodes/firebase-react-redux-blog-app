import { Layout, message } from "antd";
import { myThemeConfigs } from "../theme/antd-theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogIn from "../features/auth/hooks/use-logIn";
import AuthLoginForm from "../components/layouts/form/auth-login-form";
import { useSelector } from "react-redux";

const LogInPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { handleUserLogIn, isLaoding } = useLogIn();
  const navigate = useNavigate();
  const redirectTo = useSelector((state) => state.auth.redirectUserTo);

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
    const result = await handleUserLogIn(authLoginFormValue.email, authLoginFormValue.password, setErrorMessage);
    result && messageApi.open({ type: "success", content: "Login Berhasil🚀" });

    setTimeout(() => {
      !redirectTo && result && navigate("/");
    }, 900);
  };

  return (
    <Layout className="min-h-screen flex items-center justify-center min-w-[320px]">
      {contextHolder}
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
          isLoading={isLaoding}
          handleGoToForgotPassword={() => navigate("/lupa-password")}
          handleGoToRegister={() => navigate("/register")}
        />
      </div>
    </Layout>
  );
};

export default LogInPage;
