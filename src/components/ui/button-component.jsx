import { Button } from "antd";
import { myThemeConfigs } from "../../theme/antd-theme";
import PropTypes from "prop-types";
import withComingSoonMessage from "../hoc/with-coming-soon-message";
import withAuthModal from "../hoc/with-auth-modal";
import withTooltip from "../hoc/with-tooltip";

const ButtonComponent = ({ children, ...rest }) => {
  return (
    <Button {...rest} style={myThemeConfigs.buttonBorderList}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
export const ButtonComponentWithComingSoon = withComingSoonMessage(ButtonComponent);
export const ButtonComponentWithAuthModal = withAuthModal(ButtonComponent);
export const ButtonComponentWithTooltip = withTooltip(ButtonComponent);

ButtonComponent.propTypes = {
  children: PropTypes.node,
};
