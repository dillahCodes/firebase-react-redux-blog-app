import classNames from "classnames";
import { myThemeConfigs } from "../../../theme/antd-theme";
import HeaderTitle from "./header-title";
import useRegister from "../../../features/auth/hooks/use-register";
import useLogIn from "../../../features/auth/hooks/use-logIn";
import { useEffect, useState } from "react";
import HeaderAuthModal from "./header-auth-modal";
import NavbarHeaderMenuList from "../navbar/navbar-header-menu-list";
import useDetectLocation from "../../../hooks/use-detect-location";
import { useNavigate } from "react-router-dom";
import HeaderSearchResult from "./header-search-result";
import useHeader from "../../../hooks/use-header";

const PageHeader = () => {
  const navigate = useNavigate();
  const { isSearchBarResultShown } = useHeader();
  const { handleUserRegister } = useRegister();
  const { handleUserLogIn } = useLogIn();
  const { isAdminLocation } = useDetectLocation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginFormActive, setIsLoginFormActive] = useState(true);
  const [authLoginFormValue, setAuthLoginFormValue] = useState({ email: "", password: "" });
  const [authRegisterFormValue, setAuthRegisterFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // clear error message after 5 seconds if there is an error
  useEffect(() => {
    errorMessage &&
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
  }, [errorMessage]);

  const handleAuthLoginFormChange = (e) => {
    setAuthLoginFormValue({ ...authLoginFormValue, [e.target.name]: e.target.value });
  };

  const handleAuthRegisterFormChange = (e) => {
    setAuthRegisterFormValue({ ...authRegisterFormValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const resultLogin = await handleUserLogIn(authLoginFormValue.email, authLoginFormValue.password, setErrorMessage);
    resultLogin && setIsAuthModalOpen(false);
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
    resultRegister && setIsAuthModalOpen(false);
  };

  const handleNavigateToForgotPassword = () => navigate("/lupa-password");

  return (
    <header
      className={classNames(
        "flex items-center relative min-w-[320px] px-4   min-h-16 max-h-16 box-border justify-between    transition-all duration-300  border-b-2  border-black"
      )}
      style={{ backgroundColor: myThemeConfigs.components.Layout.headerBg }}
    >
      <div
        className={classNames("w-full  relative ", {
          " max-w-screen-xl mx-auto": !isAdminLocation,
        })}
      >
        <div className={classNames("flex items-center justify-between w-full mx-auto py-3")}>
          <HeaderTitle />
          <NavbarHeaderMenuList handleOPenAuthModal={() => setIsAuthModalOpen(true)} />
          <HeaderAuthModal
            handleGoToForgotPassword={handleNavigateToForgotPassword}
            isAuthModalOpen={isAuthModalOpen}
            setIsAuthModalOpen={setIsAuthModalOpen}
            isLoginFormActive={isLoginFormActive}
            setIsLoginFormActive={setIsLoginFormActive}
            errorMessage={errorMessage}
            handleAuthLoginFormChange={handleAuthLoginFormChange}
            authLoginFormValue={authLoginFormValue}
            handleLogin={handleLogin}
            handleAuthRegisterFormChange={handleAuthRegisterFormChange}
            authRegisterFormValue={authRegisterFormValue}
            handleRegister={handleRegister}
          />
        </div>

        {/* header search result */}
        {isSearchBarResultShown && <HeaderSearchResult />}
      </div>
    </header>
  );
};

export default PageHeader;
