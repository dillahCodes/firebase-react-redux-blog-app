import { useSelector } from "react-redux";

const useUser = () => {
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);

  return { user, status };
};

export default useUser;
