import { FloatButton } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import useDetectLocation from "../../../hooks/use-detect-location";
import withAuthModal from "../../hoc/with-auth-modal";
import useUser from "../../../features/auth/hooks/use-user";
import { useNavigate } from "react-router-dom";

const SearchBarFloatingButton = ({ ...props }) => <FloatButton tooltip="cari artikel" {...props} icon={<IoSearchOutline />} />;

const SearchBarMobileWithAuthModal = withAuthModal(SearchBarFloatingButton);
const SearchBarMobile = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isHomePageLocation, isDetailArticleLocation } = useDetectLocation();
  const { screenWidth } = useDetectClientScreenWidth();
  const isValidScreenWidth = screenWidth <= 767;
  const isValidLocations = isHomePageLocation || isDetailArticleLocation;

  if (!user && isValidScreenWidth) return <SearchBarMobileWithAuthModal />;
  if (!isValidLocations) return null;
  if (!isValidScreenWidth) return null;

  return <SearchBarFloatingButton onClick={() => navigate("/search")} />;
};

export default SearchBarMobile;
