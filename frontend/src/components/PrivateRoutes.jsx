import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ element }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth === null) return null;

  return auth
    ? element
    : navigate("/login", {
        replace: true,
        state: { from: window.location.pathname },
      });
};

export default PrivateRoutes;
