import useUser from "../../../features/auth/hooks/use-user";
import useDetectClientScreenWidth from "../../../hooks/use-detect-client-screen-width";
import useDetectLocation from "../../../hooks/use-detect-location";
import useDrawer from "../../../hooks/use-drawer";
import DrawerAdminPage from "./drawer-admin-page";
import DrawerNotification from "./drawer-notification";
import DrawerMenuUserIsLoggedIn from "./drawer-user-is-loggedin";
import DrawerUserNotLoggedIn from "./drawer-user-not-loggedin";

const DrawerMenu = () => {
  const { drawerTitle, isDrawerMenuOpen, isDrawerNotificationOpen } = useDrawer();
  const { screenWidth } = useDetectClientScreenWidth();
  const { isAdminLocation } = useDetectLocation();
  const { user } = useUser();

  const renderMenu = () => {
    if (user && isAdminLocation && screenWidth < 1120 && isDrawerMenuOpen) return <DrawerAdminPage />;
    if (user && drawerTitle.toLowerCase() === "notifikasi" && isDrawerNotificationOpen) return <DrawerNotification />;
    if (user && drawerTitle.toLowerCase() === "menu utama") return <DrawerMenuUserIsLoggedIn />;
    if (!user) return <DrawerUserNotLoggedIn />;

    return null;
  };

  return renderMenu();
};

export default DrawerMenu;
