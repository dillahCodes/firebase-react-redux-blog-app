import { ConfigProvider } from "antd";
import { IoMdTrash } from "react-icons/io";
import { MdArticle, MdDashboard, MdReport, MdSupervisedUserCircle } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../dropdown";
import { useEffect, useState } from "react";

const useCreateMenuItems = ({ defaultOpenKey = [] } = {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initial menu list
  const [menuList, setMenuList] = useState([
    {
      key: "dashboard",
      action: () => navigate("/dashboard-admin"),
      icon: <MdDashboard />,
      label: "Dashboard",
      path: "/dashboard-admin",
    },
    {
      key: "users",
      icon: <MdSupervisedUserCircle />,
      label: "Pengguna",
      path: null,
      children: [
        {
          key: "user-list",
          label: "Daftar",
          path: "/dashboard-admin/daftar-pengguna",
          action: () => navigate("/dashboard-admin/daftar-pengguna"),
        },
        {
          key: "user-edit",
          label: "Edit",
          path: "/dashboard-admin/edit-pengguna",
          action: () => navigate("/dashboard-admin/edit-pengguna"),
        },
      ],
    },
    {
      key: "articles",
      icon: <MdArticle />,
      label: "Artikel",
      path: "/dashboard-admin/persetujuan-artikel",
      action: () => navigate("/dashboard-admin/persetujuan-artikel"),
    },
    {
      key: "reports",
      icon: <MdReport />,
      label: "Laporan",
      path: null,
      children: [
        {
          key: "report-comments",
          label: "Komentar",
          path: "/dashboard-admin/laporan-komentar",
          action: () => navigate("/dashboard-admin/laporan-komentar"),
        },
        {
          key: "report-articles",
          label: "Artikel",
          path: "/dashboard-admin/laporan-artikel",
          action: () => navigate("/dashboard-admin/laporan-artikel"),
        },
        {
          key: "report-users",
          label: "Pengguna",
          path: "/dashboard-admin/laporan-pengguna",
          action: () => navigate("/dashboard-admin/laporan-pengguna"),
        },
      ],
    },
    {
      key: "deletes",
      icon: <IoMdTrash />,
      label: "Hapus",
      path: null,
      children: [
        {
          key: "delete-articles",
          label: "Artikel",
          path: "/dashboard-admin/hapus-artikel",
          action: () => navigate("/dashboard-admin/hapus-artikel"),
        },
        {
          key: "delete-comments",
          label: "Komentar",
          path: "/dashboard-admin/hapus-komentar",
          action: () => navigate("/dashboard-admin/hapus-komentar"),
        },
      ],
    },
  ]);

  // Function to check if a menu item or child is active
  const checkIsActive = (menuItem, location) => {
    // if the menuItem has children, check if any of them is active
    if (menuItem.children) return menuItem.children.some((child) => location.pathname === child.path);

    // Directly check the menuItem's path
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

  return { menuList, setMenuList };
};

const SiderAdminMenu = () => {
  const { menuList, setMenuList } = useCreateMenuItems({ defaultOpenKey: ["users", "reports"] });

  return (
    <div className="w-full flex flex-col gap-y-2 h-full">
      <ConfigProvider wave={false}>
        <Dropdown menuItems={menuList} setMenuItems={setMenuList} />
      </ConfigProvider>
    </div>
  );
};

export default SiderAdminMenu;
