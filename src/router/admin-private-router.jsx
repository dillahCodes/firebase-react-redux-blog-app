import { Outlet } from "react-router-dom";
import useUser from "../features/auth/hooks/use-user";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/ui/loading-screen";
import { history } from "../store/store";

const AdminPrivateRouter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const isAdmin = ["admin", "super_admin"].includes(user?.other_data?.role);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // wait for router ready
      // if router is ready and user is not admin, redirect to home page
      const isRouterReady = history && history.location;
      if (isRouterReady && !isAdmin) history.push("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAdmin]);

  if (isLoading && !isAdmin) return <LoadingScreen />;
  return isAdmin && history.location && <Outlet />;
};

export default AdminPrivateRouter;
