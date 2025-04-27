import { Navigate } from "react-router-dom";
import  { useAuthContext }  from "../../contexts/hooks/AuthContext";

export const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, loading } = useAuthContext();

  if (loading) {
    return <></>
  }

  return isLoggedIn ? (
    element
  ) : (
    <Navigate to={"/"} />
  );
};

export default ProtectedRoute;
