import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
};

const PublicRoutes: FunctionComponent<Props> = ({
  isAuthenticated,
  component: Component,
}) => {
  return !isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/" replace></Navigate>
  );
};

export default PublicRoutes;