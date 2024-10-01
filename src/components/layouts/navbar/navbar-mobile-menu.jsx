import classNames from "classnames";
import useNavbar from "../../../hooks/use-navbar";
import { myThemeConfigs } from "../../../theme/antd-theme";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../ui/button-component";
import { IoIosArrowDown, IoMdTrash } from "react-icons/io";
import { Button, ConfigProvider } from "antd";
import { MdArticle, MdDashboard, MdReport, MdSupervisedUserCircle } from "react-icons/md";
import { RxBookmark, RxDashboard, RxPerson, RxPieChart } from "react-icons/rx";
import { RiDraftLine } from "react-icons/ri";
import { PiArticleMediumThin } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import useDetectLocation from "../../../hooks/use-detect-location";

const NavbarMobileMenu = () => {
  const { isMobileNavbarOpen } = useNavbar();
  return (
    <section
      id="mobile-navbar-menu"
      className={classNames(
        " absolute top-[63px] w-full transition-all overflow-hidden duration-300  right-0  border-black ",
        {
          "h-screen border-l-[3px] border-b-[3px] p-3": isMobileNavbarOpen,
          "h-0 p-0": !isMobileNavbarOpen,
        }
      )}
      style={{ backgroundColor: myThemeConfigs.components.Layout.bodyBg }}
    >
      <MobileMenu />
    </section>
  );
};

export default NavbarMobileMenu;

const MobileMenu = () => {
  const menuItemsHeightRef = useRef({});
  const { isAdminLocation, locationPath } = useDetectLocation();
  const [menuItems, setMenuItems] = useState(isAdminLocation ? adminMobileMenu : menuProfile);
  const navigate = useNavigate();

  const isMenuActive = (to) => locationPath === to;

  // handle toggle to open buttin with children
  const toggleChildren = (key) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.key === key ? { ...item, isChildrenOpen: !item.isChildrenOpen } : item))
    );
  };

  // check if children is active and same as location
  const isChildrenActive = (key) => {
    const parentItem = menuItems.find((item) => item.key === key);
    if (parentItem && parentItem.children) {
      return parentItem.children.some((child) => child.to === locationPath);
    }
    return false;
  };

  // set height of button, the  default height if no children height is set to 48px
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.isChildrenOpen && menuItemsHeightRef.current[item.key]) {
        menuItemsHeightRef.current[item.key].style.height = `${menuItemsHeightRef.current[item.key].scrollHeight + 1}px`;
      } else if (menuItemsHeightRef.current[item.key]) {
        menuItemsHeightRef.current[item.key].style.height = "48px";
      }
    });
  }, [menuItems]);

  const adminMenu = menuItems.map((item) => (
    <div
      key={item.key}
      ref={(ref) => (menuItemsHeightRef.current[item.key] = ref)}
      className={classNames("overflow-hidden flex flex-col gap-2 px-1  transition-all duration-300 ")}
    >
      <ButtonComponent
        icon={item.icon}
        type="primary"
        className={classNames(
          "w-full flex items-center justify-start py-5 capitalize font-roboto-slab border border-black",
          { "bg-[#58942e] text-white": locationPath === item.to, "text-white": isChildrenActive(item.key) }
        )}
        onClick={() => {
          navigate(item.to);
          toggleChildren(item.key);
        }}
      >
        {item.label}
        {item.children && (
          <span className={classNames("ml-auto transition-all duration-300", { "rotate-180": item.isChildrenOpen })}>
            <IoIosArrowDown />
          </span>
        )}
      </ButtonComponent>

      <div className="w-full flex flex-col gap-y-1">
        {item.children?.map((child) => (
          <Button
            onClick={() => navigate(child.to)}
            key={child.key}
            className={classNames(
              "w-full cursor-pointer flex hover:bg-[#58942e] transition-all duration-300 hover:text-white items-center rounded-md py-3 justify-start capitalize font-roboto-slab border border-black",
              {
                "bg-[#58942e] text-white": locationPath === child.to,
              }
            )}
          >
            {child.label}
          </Button>
        ))}
      </div>
    </div>
  ));

  const userMenu = menuItems.map((item, index) => (
    <ButtonComponent
      type="primary"
      icon={<span className="text-xl">{item.icons}</span>}
      key={index}
      style={{
        backgroundColor: "#b8e986",
        color: myThemeConfigs.token.colorText,
        boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 1)",
      }}
      onClick={() => navigate(item.to)}
      className={classNames("flex items-center justify-start cursor-pointer hover: gap-x-2 w-full py-2 rounded-md", {
        "bg-[#58942e] text-white": isMenuActive(item.to),
      })}
    >
      <span className="font-roboto-slab">{item.name}</span>
    </ButtonComponent>
  ));

  return (
    <ConfigProvider wave={false}>
      <div className="w-full flex flex-col gap-y-2">{isAdminLocation ? adminMenu : userMenu}</div>
    </ConfigProvider>
  );
};

const adminMobileMenu = [
  {
    key: "0",
    to: "/dashboard-admin",
    icon: <MdDashboard />,
    label: <p className="m-0">Dashboard</p>,
  },

  {
    key: "1",
    icon: <MdSupervisedUserCircle />,
    label: <p className="m-0">Pengguna</p>,
    isChildrenOpen: true,
    children: [
      {
        key: "1-1",
        label: <p className="m-0">Daftar</p>,
        to: "/dashboard-admin/daftar-pengguna",
      },
      {
        key: "1-2",
        label: <p className="m-0">Edit</p>,
        to: "/dashboard-admin/edit-pengguna",
      },
    ],
  },
  {
    key: "2",
    icon: <MdArticle />,
    label: <p className="m-0">Artikel</p>,
    to: "/dashboard-admin/persetujuan-artikel",
  },
  {
    key: "3",
    icon: <MdReport />,
    label: <p className="m-0">Laporan</p>,
    isChildrenOpen: true,
    children: [
      {
        key: "3-1",
        label: <p className="m-0">Komentar</p>,
        to: "/dashboard-admin/laporan-komentar",
      },
      {
        key: "3-2",
        label: <p className="m-0">Artikel</p>,
        to: "/dashboard-admin/laporan-artikel",
      },
      {
        key: "3-3",
        label: <p className="m-0">Pengguna</p>,
        to: "/dashboard-admin/laporan-pengguna",
      },
    ],
  },
  {
    key: "4",
    icon: <IoMdTrash />,
    label: <p className="m-0">Hapus</p>,
    isChildrenOpen: true,
    children: [
      {
        key: "4-1",
        label: <p className="m-0">Artikel</p>,
        to: "/dashboard-admin/hapus-artikel",
      },
      {
        key: "4-2",
        label: <p className="m-0">Komentar</p>,
        to: "/dashboard-admin/hapus-komentar",
      },
    ],
  },
];

const menuProfile = [
  {
    name: "profil",
    icons: <RxPerson />,
    to: "/",
  },
  {
    name: "draf",
    icons: <RiDraftLine />,
  },
  {
    name: "dashboard admin",
    icons: <RxDashboard />,
    isAdminOnly: true,
    to: "/dashboard-admin",
  },
  {
    name: "statistik",
    icons: <RxPieChart />,
  },
  {
    name: "artikelku",
    icons: <PiArticleMediumThin />,
  },
  {
    name: "penanda",
    icons: <RxBookmark />,
  },
  {
    name: "pengaturan",
    icons: <IoSettingsOutline />,
  },
  {
    name: "bantuan",
    icons: <TfiHeadphoneAlt />,
  },
];
