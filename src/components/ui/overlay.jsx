import classNames from "classnames";
import PropTypes from "prop-types";

const Overlay = ({ topPosition, isActive, zIndex }) => {
  return (
    <section
      id="overlay"
      style={{ top: `${topPosition}px`, zIndex: zIndex }}
      className={classNames(
        `fixed  left-0 right-0 bottom-0 mx-auto max-w-screen-2xl  bg-black opacity-0 transition-all duration-500  h-screen w-screen`,
        {
          "opacity-35": isActive,
        }
      )}
    />
  );
};

export default Overlay;

Overlay.propTypes = {
  topPosition: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,
};
