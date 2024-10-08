import { Badge, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent, { ButtonComponentWithAuthModal } from "../../ui/button-component";
import { FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import useUser from "../../../features/auth/hooks/use-user";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiNotePencil } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import classNames from "classnames";
import { isBrowser, isMobile } from "react-device-detect";
import useDetectLocation from "../../../hooks/use-detect-location";
import useDrawer from "../../../hooks/use-drawer";
import AvatarProfile from "../../ui/avatar-profile";

const { Text } = Typography;

const NavbarHeaderMenuList = () => {
  const { isAddArticleLocation, isAdminLocation } = useDetectLocation();
  const { openDrawerMenu, openDrawerNotification } = useDrawer();
  const navigate = useNavigate();
  const { user } = useUser();
  const photoUrl = user?.photoURL || "";

  // component if user is loggedin
  const userAlreadyLogin = (
    <div className="min-w-fit flex items-center gap-x-5  ">
      {/* add article */}
      {!isAddArticleLocation && !isAdminLocation && (
        <Button
          onClick={() => navigate("/tambah-artikel", { replace: true })}
          className={classNames(
            "bg-transparent  transition-all duration-300  p-0 shadow-none text-xl hover:outline-none hover:border-none outline-none border-none",
            {
              "hidden sm:flex": isMobile,
            }
          )}
        >
          <PiNotePencil className=" transition-all duration-300" />
          <Text className=" transition-all duration-300 capitalize font-roboto-slab">tulis idemu✨</Text>
        </Button>
      )}
      {/* notification */}
      <Badge size="small" count={0}>
        <Button
          onClick={openDrawerNotification}
          className="bg-transparent p-0 shadow-none text-2xl hover:outline-none hover:border-none outline-none border-none"
        >
          <IoMdNotificationsOutline />
        </Button>
      </Badge>

      {/* profile */}
      <AvatarProfile onClick={openDrawerMenu} userName={user?.displayName} photoURL={photoUrl} />
    </div>
  );

  // component if user not loggedin
  const userNotLogin = (
    <>
      {navMenu.map((item) => (
        <Link
          key={item.key}
          to={"/coming-soon"}
          className={classNames("mx-1 px-4 font-special-elite min-w-fit max-lg:hidden", {
            "md:hidden": isMobile,
          })}
        >
          <Text className="hover:text-[#dcfab6] transition-all font-roboto-slab duration-300 ">{item.label}</Text>
        </Link>
      ))}
      <ButtonComponentWithAuthModal
        icon={<FaUserCircle />}
        type="primary"
        className={classNames("capitalize border  m-1 border-black font-special-elite", {
          "hidden ": isMobile,
        })}
      >
        daftar/masuk
      </ButtonComponentWithAuthModal>

      {/* hamburger menu */}
      <ButtonComponent
        onClick={openDrawerMenu}
        type="primary"
        className={classNames("w-fit ml-3 flex items-center capitalize font-special-elite border border-black m-1", {
          "block ": isMobile,
          "hidden max-lg:flex": isBrowser,
        })}
      >
        <RxHamburgerMenu />
      </ButtonComponent>
    </>
  );

  return <div className="w-fit flex items-center relative">{user ? userAlreadyLogin : userNotLogin}</div>;
};

export default NavbarHeaderMenuList;
NavbarHeaderMenuList.propTypes = {
  handleOPenAuthModal: PropTypes.func,
};

const navMenu = [
  {
    key: "/CeritaKami",
    label: "Cerita Kami",
  },
  {
    key: "/Kontak",
    label: "Kontak",
  },
  {
    key: "/login",
    label: "masuk",
  },
];
