import { Tooltip } from "antd";
import PropTypes from "prop-types";

const withTooltip = (Component) => {
  const WrappedComponent = ({ tooltipText, ...props }) => {
    return (
      <Tooltip mouseEnterDelay={1} title={tooltipText}>
        <>
          <Component {...props} />
        </>
      </Tooltip>
    );
  };

  WrappedComponent.propTypes = {
    tooltipText: PropTypes.string.isRequired,
  };

  WrappedComponent.displayName = `withTooltip(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};

export default withTooltip;
