import { Drawer } from "antd";
import PropTypes from "prop-types";
import "./drawer.css";

const PageDrawer = ({ isOpen, closeDrawer, children, width, className, ...props }) => {
  return (
    <Drawer open={isOpen} onClose={closeDrawer} width={width} className={className} {...props}>
      {children}
    </Drawer>
  );
};

export default PageDrawer;

PageDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  className: PropTypes.string,
};
