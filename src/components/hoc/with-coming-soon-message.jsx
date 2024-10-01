import { message } from "antd";
import PropTypes from "prop-types";

const withComingSoonMessage = (Component) => {
  const WrappedComponent = ({ messageAlert, ...props }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const handleClick = () => messageApi.info(messageAlert || "Coming Soon!");

    return (
      <>
        {contextHolder}
        <Component {...props} onClick={handleClick} />
      </>
    );
  };

  WrappedComponent.propTypes = {
    messageAlert: PropTypes.string,
  };

  return WrappedComponent;
};

export default withComingSoonMessage;
