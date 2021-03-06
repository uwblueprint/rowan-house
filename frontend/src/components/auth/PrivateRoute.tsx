import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { Role } from "../../types/AuthTypes";
import AuthContext from "../../contexts/AuthContext";
import {
  HOME_PAGE,
  LOGIN_PAGE,
  VERIFY_EMAIL_PAGE,
} from "../../constants/Routes";

type PrivateRouteProps = {
  component: React.FC;
  path: string;
  exact: boolean;
  roles?: ReadonlyArray<Role>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  exact,
  path,
  // Note: we're defaulting to Admin here since:
  //  a) the majority of private pages are on the Admin side
  //  b) we want new pages to default to the most restrictive permission in
  //     order to prevent bugs
  roles = ["Admin"],
}: PrivateRouteProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  if (!authenticatedUser) {
    return <Redirect to={LOGIN_PAGE} />;
  }
  if (!authenticatedUser.emailVerified) {
    return <Redirect to={VERIFY_EMAIL_PAGE} />;
  }
  if (!roles.includes(authenticatedUser.role)) {
    return <Redirect to={HOME_PAGE} />;
  }
  return <Route path={path} exact={exact} component={component} />;
};
export default PrivateRoute;
