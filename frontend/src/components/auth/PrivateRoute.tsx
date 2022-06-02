import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import { LOGIN_PAGE, VERIFY_EMAIL_PAGE } from "../../constants/Routes";

type PrivateRouteProps = {
  component: React.FC;
  path: string;
  exact: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  exact,
  path,
}: PrivateRouteProps) => {
  const { authUser } = useContext(AuthContext);

  if (!authUser) {
    return <Redirect to={LOGIN_PAGE} />;
  }
  if (!authUser?.emailVerified) {
    return <Redirect to={VERIFY_EMAIL_PAGE} />;
  }
  return <Route path={path} exact={exact} component={component} />;
};
export default PrivateRoute;
