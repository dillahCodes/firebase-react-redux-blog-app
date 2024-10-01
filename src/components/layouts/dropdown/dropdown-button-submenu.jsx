import { Button } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

const DropdownButtonSubMenu = ({ childrenItems }) => {
  const handleClickSubMenu = (item) => {
    item.action && item.action();
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      {childrenItems.map((child) => (
        <Button
          key={child.key}
          onClick={() => handleClickSubMenu(child)}
          className={classNames(
            "w-full cursor-pointer flex hover:bg-[#58942e] transition-all duration-300 hover:text-white items-center rounded-md py-3 justify-start capitalize font-roboto-slab border border-black",
            {
              "bg-[#58942e]  text-white": child?.isActive,
            }
          )}
        >
          <p className="m-0">{child.label}</p>
        </Button>
      ))}
    </div>
  );
};

export default DropdownButtonSubMenu;

DropdownButtonSubMenu.propTypes = {
  childrenItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      action: PropTypes.func,
    })
  ).isRequired,
};
