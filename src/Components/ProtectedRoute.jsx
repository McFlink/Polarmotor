import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../Context/AdminContext";

const ProtectedRoute = () => {
  const { isAdmin } = useAdmin();

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
