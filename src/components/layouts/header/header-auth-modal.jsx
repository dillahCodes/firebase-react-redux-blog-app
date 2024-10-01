import PropTypes from "prop-types";
import ModalComponent from "../../ui/modal-component";
import AuthLoginForm from "../form/auth-login-form";
import AuthRegisterForm from "../form/auth-register-form";

const HeaderAuthModal = ({
  isAuthModalOpen,
  setIsAuthModalOpen,
  isLoginFormActive,
  setIsLoginFormActive,
  errorMessage,
  handleAuthLoginFormChange,
  authLoginFormValue,
  handleLogin,
  handleAuthRegisterFormChange,
  authRegisterFormValue,
  handleRegister,
  handleGoToForgotPassword,
}) => {
  return (
    <ModalComponent
      open={isAuthModalOpen}
      closeIcon={null}
      footer={null}
      onCancel={() => {
        setIsAuthModalOpen(false);
        setIsLoginFormActive(true);
      }}
      afterClose={() => setIsAuthModalOpen(false)}
    >
      {isLoginFormActive ? (
        <AuthLoginForm
          handleGoToForgotPassword={handleGoToForgotPassword}
          errorMessage={errorMessage}
          handleInputChange={handleAuthLoginFormChange}
          inputEmailValue={authLoginFormValue.email}
          inputPasswordValue={authLoginFormValue.password}
          handleSubmit={handleLogin}
          handleGoToRegister={() => setIsLoginFormActive(false)}
        />
      ) : (
        <AuthRegisterForm
          errorMessage={errorMessage}
          handleInputChange={handleAuthRegisterFormChange}
          inputEmailValue={authRegisterFormValue.email}
          inputPasswordValue={authRegisterFormValue.password}
          inputUserNameValue={authRegisterFormValue.userName}
          inputConfirmPasswordValue={authRegisterFormValue.confirmPassword}
          handleGoToLogin={() => setIsLoginFormActive(true)}
          handleSubmit={handleRegister}
        />
      )}
    </ModalComponent>
  );
};

HeaderAuthModal.propTypes = {
  isAuthModalOpen: PropTypes.bool.isRequired,
  setIsAuthModalOpen: PropTypes.func.isRequired,
  isLoginFormActive: PropTypes.bool.isRequired,
  setIsLoginFormActive: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handleAuthLoginFormChange: PropTypes.func.isRequired,
  authLoginFormValue: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleAuthRegisterFormChange: PropTypes.func.isRequired,
  authRegisterFormValue: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  handleRegister: PropTypes.func.isRequired,
  handleGoToForgotPassword: PropTypes.func.isRequired,
};

export default HeaderAuthModal;
