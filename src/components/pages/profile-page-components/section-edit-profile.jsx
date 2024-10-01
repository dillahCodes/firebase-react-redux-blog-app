import { myThemeConfigs } from "../../../theme/antd-theme";
import { Typography } from "antd";
import EditProfileImage from "./edit-profile-image";
import { RiEdit2Fill } from "react-icons/ri";
import EditProfileVerifyEmail from "./edit-profile-verify-email";
import EditProfileChangeUsername from "./edit-profile-change-username";
import EditProfileChangePassword from "./edit-profile-change-password";
import EditProfileChangeEmail from "./edit-profile-change-email";

const { Title } = Typography;

const SectionEditProfile = () => {
  return (
    <main className="w-full h-full bg-[#b8e986] p-3 rounded-md" style={myThemeConfigs.siderBorderStyle}>
      <Title level={5} className="capitalize font-roboto-slab flex items-center gap-x-2">
        <span>
          <RiEdit2Fill />
        </span>
        edit profil
      </Title>

      <div className="w-full mt-3 flex flex-col gap-y-5">
        <EditProfileImage />
        <EditProfileChangeUsername />
        <EditProfileVerifyEmail />
        <EditProfileChangeEmail />
        <EditProfileChangePassword />
      </div>
    </main>
  );
};

export default SectionEditProfile;
