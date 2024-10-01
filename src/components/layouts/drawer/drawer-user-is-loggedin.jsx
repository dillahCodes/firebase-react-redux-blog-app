import { IoSettingsOutline } from "react-icons/io5";
import { PiArticleMediumThin, PiNotePencil } from "react-icons/pi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RxBookmark, RxDashboard, RxPerson } from "react-icons/rx";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../../../features/auth/hooks/use-user";
import ButtonComponent from "../../ui/button-component";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import obscureEmail from "../../../utils/obscure-email";
import firebaseAuthServices from "../../../features/auth/firebase-auth-services";
import { useEffect, useMemo, useState } from "react";
import Dropdown from "../dropdown";
import { Flex } from "antd";

const useCreateMenuItems = ({ defaultOpenKey = [], user = {} } = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useMemo(() => (user ? ["admin", "super_admin"].includes(user?.other_data?.role) : false), [user]);

  // Initial menu list
  const [menuList, setMenuList] = useState([
    {
      key: "buat artikel",
      icon: <PiNotePencil />,
      action: () => navigate("/tambah-artikel"),
      label: "Buat Artikel",
      path: "/tambah-artikel",
    },
    {
      key: "profil",
      icon: <RxPerson />,
      label: "Profil",
      path: null,
      children: [
        {
          key: "profilku",
          action: () => navigate("/coming-soon"),
          label: "Profilku",
          path: "/profilku",
        },
        {
          key: "edit profil",
          action: () => navigate("/edit-profil"),
          label: "Edit Profil",
          path: "/edit-profil",
        },
      ],
    },
    {
      key: "dashboard admin",
      icon: <RxDashboard />,
      action: () => navigate("/dashboard-admin"),
      label: "Dashboard Admin",
      path: "/dashboard-admin",
    },
    {
      key: "artikel",
      icon: <PiArticleMediumThin />,
      label: "Artikel",
      path: null,
      children: [
        {
          key: "artikelku",
          action: () => navigate("/artikelku"),
          label: "Artikelku",
          path: "/artikelku",
        },
        {
          key: "draft",
          action: () => navigate("/coming-soon"),
          label: "draft",
          path: "/tulis-artikel",
        },
      ],
    },
    {
      key: "pennanda",
      icon: <RxBookmark />,
      action: () => navigate("/coming-soon"),
      label: "Penanda",
      path: "/penanda",
    },
    {
      key: "pengaturan",
      icon: <IoSettingsOutline />,
      action: () => navigate("/coming-soon"),
      label: "Pengaturan",
      path: "/pengaturan",
    },
    {
      key: "bantuan",
      icon: <TfiHeadphoneAlt />,
      action: () => navigate("/coming-soon"),
      label: "Bantuan",
      path: "/bantuan",
    },
  ]);

  // Function to check if a menu item or child is active
  const checkIsActive = (menuItem, location) => {
    // if the menuItem has children, check if any of them is active
    if (menuItem.children) return menuItem.children.some((child) => location.pathname === child.path);
    return location.pathname === menuItem.path;
  };

  // Update the menuList with isActive state whenever location changes
  useEffect(() => {
    setMenuList((prevMenuList) =>
      prevMenuList.map((menuItem) => ({
        ...menuItem,
        isActive: checkIsActive(menuItem, location),
        children: menuItem.children?.map((child) => ({
          ...child,
          isActive: location.pathname === child.path, // Directly check the child's path
        })),
      }))
    );
  }, [location]);

  // set default open key
  useEffect(() => {
    setMenuList((prevMenuList) =>
      prevMenuList.map((menuItem) => ({
        ...menuItem,
        isChildrenOpen: menuItem.children && defaultOpenKey.includes(menuItem.key),
      }))
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAdmin) setMenuList(menuList.filter((item) => item.key !== "dashboard admin"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return { menuList, setMenuList };
};

const DrawerMenuUserIsLoggedIn = () => {
  const { user } = useUser();
  const { screenWidth } = useDetectClientScreenWidth();
  const { menuList, setMenuList } = useCreateMenuItems({ defaultOpenKey: ["artikel"], user });

  const obscureUserEmail = obscureEmail(user?.email);

  const handleLogOut = () => firebaseAuthServices.logOut();

  return (
    <div className="p-3 h-full">
      <Flex vertical gap="small" className="h-full w-full max-w-2xl mx-auto">
        <Flex vertical gap="small">
          <Dropdown menuItems={menuList} setMenuItems={setMenuList} />
        </Flex>

        {/* logout button */}
        {screenWidth > 767 && (
          <Flex align="center" justify="space-between" className="border-t pt-3 mt-auto w-full">
            <span className="normal-case mb-0">{obscureUserEmail}</span>
            <ButtonComponent
              onClick={handleLogOut}
              icon={<RiLogoutBoxRLine />}
              type="primary"
              className="capitalize flex items-center font-roboto-slab"
            >
              keluar
            </ButtonComponent>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default DrawerMenuUserIsLoggedIn;
