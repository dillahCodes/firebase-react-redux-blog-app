import { Modal } from "antd";
import { useEffect, useState } from "react";
import AuthLoginForm from "../layouts/form/auth-login-form";
import "./style/with-auth-modal-style.css";
import useLogIn from "../../features/auth/hooks/use-logIn";
import { useNavigate } from "react-router-dom";

const withAuthModal = (Component) => {
  const WrappedComponent = ({ ...props }) => {
    const { handleUserLogIn } = useLogIn();
    const navigate = useNavigate();

    const [authLoginFormValue, setAuthLoginFormValue] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
      errorMessage &&
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
    }, [errorMessage]);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);

    const handleAuthLoginFormChange = (e) => {
      setAuthLoginFormValue({ ...authLoginFormValue, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
      e.preventDefault();

      const resultLogin = await handleUserLogIn(authLoginFormValue.email, authLoginFormValue.password, setErrorMessage);

      if (resultLogin) {
        setAuthLoginFormValue({ email: "", password: "" });
        setIsModalVisible((prev) => !prev);
        resultLogin && navigate("/");
      }
    };

    const handleGoToRegister = () => navigate("/register");
    const handleGoToForgotPassword = () => navigate("/lupa-password");

    return (
      <>
        <Component {...props} onClick={handleOpenModal} />
        <Modal open={isModalVisible} footer={null} onCancel={handleCloseModal} destroyOnClose={true}>
          <AuthLoginForm
            handleSubmit={handleLogin}
            handleGoToForgotPassword={handleGoToForgotPassword}
            handleInputChange={handleAuthLoginFormChange}
            handleGoToRegister={handleGoToRegister}
            errorMessage={errorMessage}
          />
        </Modal>
      </>
    );
  };

  return WrappedComponent;
};

export default withAuthModal;
