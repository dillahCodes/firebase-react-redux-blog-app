import { useDispatch, useSelector } from "react-redux";
import {
  closeAllDrawer,
  closeDrawerMenu,
  closeDrawerNotification,
  openDrawerMenu,
  openDrawerNotification,
  setDrawerTitle,
  toggleDrawerMenu,
  toggleDrawerNotification,
} from "../store/slices/drawer-slice";

const useDrawer = () => {
  const dispatch = useDispatch();
  const isDrawerMenuOpen = useSelector((state) => state.drawer.isDrawerMenuOpen);
  const isDrawerNotificationOpen = useSelector((state) => state.drawer.isDrawerNotificationOpen);
  const drawerTitle = useSelector((state) => state.drawer.drawerTitle);

  const handleSetDrawerTitle = (title) => dispatch(setDrawerTitle(title));

  return {
    drawerTitle,
    isDrawerMenuOpen,
    isDrawerNotificationOpen,
    openDrawerMenu: () => dispatch(openDrawerMenu()),
    closeDrawerMenu: () => dispatch(closeDrawerMenu()),
    toggleDrawerMenu: () => dispatch(toggleDrawerMenu()),
    openDrawerNotification: () => dispatch(openDrawerNotification()),
    closeDrawerNotification: () => dispatch(closeDrawerNotification()),
    toggleDrawerNotification: () => dispatch(toggleDrawerNotification()),
    closeAllDrawer: () => dispatch(closeAllDrawer()),
    setDrawerTitle: (title) => handleSetDrawerTitle(title),
  };
};

export default useDrawer;
