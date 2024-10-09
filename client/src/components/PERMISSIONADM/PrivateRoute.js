import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAdmin }) => {
  return isAdmin ? element : <Navigate to="/" />;
};

export default PrivateRoute;
