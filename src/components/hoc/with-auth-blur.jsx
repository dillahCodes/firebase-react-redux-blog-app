import { useNavigate } from "react-router-dom";
import useUser from "../../features/auth/hooks/use-user";
import ButtonComponent from "../ui/button-component";
import PropTypes from "prop-types";

const withAuthBlur = (Component) => {
  const WrappedComponent = ({ iconButton, textButton, ...props }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    // If the user is authenticated, render the original component
    if (user) return <Component {...props} />;

    // If not authenticated, render the blurred component with the button overlay
    return (
      <div className="w-full relative">
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <ButtonComponent
            onClick={() => navigate("/login")}
            type="primary"
            className="capitalize text-xs font-roboto-slab cursor-pointer flex items-center"
            icon={iconButton}
          >
            {textButton}
          </ButtonComponent>
        </div>
        <div className="w-full blur-sm z-0">
          <Component {...props} />
        </div>
      </div>
    );
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name || "Component"})`;

  WrappedComponent.propTypes = {
    iconButton: PropTypes.node,
    textButton: PropTypes.string,
  };

  return WrappedComponent;
};

export default withAuthBlur;
