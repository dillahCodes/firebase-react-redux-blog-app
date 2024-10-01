import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../features/auth/hooks/use-user";
import { history } from "../store/store";
import { useEffect } from "react";

const PrivateRouter = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // wait for router ready
  // if router is ready and user is null, redirect to home page
  useEffect(() => {
    const timer = setTimeout(() => {
      const isRouterReady = history && history.location;
      if (isRouterReady && !user) navigate("/", { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return user && history.location && <Outlet />;
};

export default PrivateRouter;
