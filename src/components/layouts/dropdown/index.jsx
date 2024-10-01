import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DropdownButton from "./dropdown-button";
import { ConfigProvider } from "antd";

const Dropdown = ({ menuItems, setMenuItems }) => {
  const menuItemsHeightRef = useRef({});

  // Update menu item height based on whether children are open
  useEffect(() => {
    menuItems.forEach((item) => {
      const menuItemRef = menuItemsHeightRef.current[item.key];
      if (!menuItemRef || !menuItemRef.scrollHeight) return;

      const isItemOpen = item.isChildrenOpen ?? false;
      menuItemRef.style.height = isItemOpen ? `${menuItemRef.scrollHeight}px` : `48px`;
    });
  }, [menuItems]);

  return (
    <ConfigProvider wave={false}>
      {menuItems.map((item) => (
        <DropdownButton key={item.key} item={item} setMenuItems={setMenuItems} menuItemsHeightRef={menuItemsHeightRef} />
      ))}
    </ConfigProvider>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  setMenuItems: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.element,
      label: PropTypes.node.isRequired,
      action: PropTypes.func,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          label: PropTypes.node.isRequired,
          action: PropTypes.func,
        })
      ),
    })
  ).isRequired,
};
