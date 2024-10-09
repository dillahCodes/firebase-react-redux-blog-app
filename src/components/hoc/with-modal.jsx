import { Modal } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";

const withModal = (Component) => {
  const WrappedComponent = ({ modalTitle, modalContent, ...props }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);

    // Merging onClick handlers to avoid overwriting the existing one
    const handleClick = (e) => {
      if (props.onClick) {
        props.onClick(e);
      }
      handleOpenModal();
    };

    return (
      <>
        <Component {...props} onClick={handleClick} />
        <Modal open={isModalVisible} title={modalTitle} footer={null} onCancel={handleCloseModal} destroyOnClose={true}>
          {modalContent}
        </Modal>
      </>
    );
  };

  WrappedComponent.propTypes = {
    onClick: PropTypes.func,
    modalTitle: PropTypes.node,
    modalContent: PropTypes.node.isRequired,
  };
  return WrappedComponent;
};

export default withModal;
