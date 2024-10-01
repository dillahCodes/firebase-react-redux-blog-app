import { Alert, Flex, Input, Layout, Typography } from "antd";
import { myThemeConfigs } from "../theme/antd-theme";
import ButtonComponent from "../components/ui/button-component";
import { MdEmail } from "react-icons/md";
import useResetPassword from "../features/auth/hooks/use-reset-password";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { handleResetPassword } = useResetPassword();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleResetPassword(email);
    if (result) setErrorMessage(result);

    // set timeout to remove error message
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <Layout className="min-h-screen flex items-center justify-center p-3">
      <div
        className={`max-w-screen-sm w-full rounded-md p-3  `}
        style={{ border: "2px solid", borderColor: myThemeConfigs.token.colorText }}
      >
        <Title className="font-special-elite capitalize" level={4}>
          atur ulang password
        </Title>
        <Text className="font-roboto-slab text-sm max-sm:text-xs mt-3">
          Hi {"<"}MatchaCoders!🍵/{">"} Masukkan email akunmu untuk reset password 🔒🤗
        </Text>

        {errorMessage && (
          <Alert
            message={errorMessage?.message}
            type={errorMessage?.success ? "success" : "error"}
            icon={
              errorMessage?.success ? (
                <FaCheckCircle className="text-[#58942e]" />
              ) : (
                <IoMdCloseCircle className="text-red-600" />
              )
            }
            showIcon
            className={classNames("mt-3 bg-[#b8e986] text-[#58942e] font-roboto-slab", {
              "bg-red-400 text-red-200": !errorMessage?.success,
            })}
            closeIcon={
              <RiCloseLargeFill className={classNames("text-[#58942e]", { "text-red-200": !errorMessage?.success })} />
            }
          />
        )}

        <form className="mt-3 flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <ButtonComponent
            icon={<MdEmail />}
            className="w-full font-roboto-slab capitalize"
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
          >
            kirim email reset password
          </ButtonComponent>
        </form>

        <Flex className="w-full mt-3">
          <Text className="font-roboto-slab text-xs ">
            sudah punya akun?{" "}
            <span className="underline cursor-pointer font-bold capitalize" onClick={() => navigate("/login")}>
              masuk
            </span>
          </Text>
        </Flex>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
