import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

interface PrivateRouteProps {
  children: React.ReactNode | React.ReactNode[];
}
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { authToken } = useAppSelector((state) => state.auth);

  if (authToken) {
    return <>{children}</>;
  } else {
    return <Navigate to={{ pathname: "/auth" }} />;
  }
};
