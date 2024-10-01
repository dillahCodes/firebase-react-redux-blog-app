import PropTypes from "prop-types";
import ButtonComponent from "../../ui/button-component";
import classNames from "classnames";
import { IoIosArrowDown } from "react-icons/io";
import DropdownButtonSubMenu from "./dropdown-button-submenu";

const DropdownButton = ({ item, menuItemsHeightRef, setMenuItems }) => {
  // handle toggle to open buttin with children
  const handleOpenNestedMenu = (key) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.key === key ? { ...item, isChildrenOpen: !item.isChildrenOpen } : item))
    );
  };

  return (
    <div
      key={item.key}
      ref={(ref) => (menuItemsHeightRef.current[item.key] = ref)}
      className="overflow-hidden flex flex-col gap-2 px-1 transition-all duration-300 p-1"
    >
      <ButtonComponent
        onClick={() => {
          item.action && item.action(); // action from MenuItem
          handleOpenNestedMenu(item.key);
        }}
        icon={item.icon}
        type="primary"
        className={classNames("w-full flex items-center justify-start py-5 capitalize font-roboto-slab border border-black", {
          "  text-slate-50": item?.isActive,
        })}
      >
        <p className="m-0">{item.label}</p>
        {item.children && (
          <span
            className={classNames("ml-auto transition-all duration-300", {
              "rotate-180": item.isChildrenOpen,
            })}
          >
            <IoIosArrowDown />
          </span>
        )}
      </ButtonComponent>

      {item.children && item.isChildrenOpen && <DropdownButtonSubMenu childrenItems={item.children} />}
    </div>
  );
};

export default DropdownButton;

DropdownButton.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    icon: PropTypes.element,
    label: PropTypes.node.isRequired,
    action: PropTypes.func,
    isActive: PropTypes.bool,
    isChildrenOpen: PropTypes.bool,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired,
        action: PropTypes.func,
      })
    ),
  }).isRequired,
  setMenuItems: PropTypes.func.isRequired,
  menuItemsHeightRef: PropTypes.shape({
    current: PropTypes.objectOf(PropTypes.instanceOf(Element)),
  }).isRequired,
};
