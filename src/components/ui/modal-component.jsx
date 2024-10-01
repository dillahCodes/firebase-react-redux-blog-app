import { Modal } from "antd";
import PropTypes from "prop-types";

const ModalComponent = ({ children, ...props }) => {
  return <Modal {...props}>{children}</Modal>;
};

export default ModalComponent;

ModalComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
