import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import defaultTheme from "./theme";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./components/auth/PrivateRoute";
import CourseOverview from "./components/pages/CourseOverview";
import Default from "./components/pages/Default";
import Logout from "./components/pages/Logout";
import NotFound from "./components/pages/NotFound";
import ModuleEditor from "./components/pages/ModuleEditor";
import ModuleViewer from "./components/pages/ModuleViewer";
import VerifyEmail from "./components/pages/VerifyEmail";
import * as Routes from "./constants/Routes";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import USER_ROLES from "./constants/UserConstants";
import AuthContext from "./contexts/AuthContext";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
import { AuthenticatedUser } from "./types/AuthTypes";
import client from "./APIClients/BaseAPIClient";
import ManageUsersPage from "./components/pages/ManageUsersPage";
import ManageCoursesPage from "./components/pages/ManageCoursesPage";

const App = (): React.ReactElement => {
  const currentUser: AuthenticatedUser = getLocalStorageObj<AuthenticatedUser>(
    AUTHENTICATED_USER_KEY,
  );

  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(
    currentUser,
  );

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
        <ChakraProvider theme={defaultTheme}>
          <Router>
            <Switch>
              <Route exact path={Routes.LOGIN_PAGE} component={Login} />
              <Route exact path={Routes.SIGNUP_PAGE} component={Signup} />
              <Route exact path={Routes.HOME_PAGE} component={Default} />
              <Route
                exact
                path={`${Routes.COURSE_OVERVIEW_BASE_ROUTE}/:courseID`}
                component={CourseOverview}
              />
              <PrivateRoute
                exact
                path={`${Routes.COURSE_OVERVIEW_BASE_ROUTE}/:courseID/:moduleIndex`}
                component={ModuleViewer}
                roles={USER_ROLES}
              />
              <Redirect
                exact
                from={Routes.ADMIN_DASHBOARD_BASE}
                to={Routes.MANAGE_COURSES_PAGE}
              />
              <PrivateRoute
                exact
                path={Routes.MANAGE_COURSES_PAGE}
                component={ManageCoursesPage}
              />
              <PrivateRoute
                exact
                path={Routes.MANAGE_USERS_PAGE}
                component={ManageUsersPage}
              />
              <PrivateRoute
                exact
                path={`${Routes.ADMIN_MODULE_EDITOR_BASE_ROUTE}/:courseID/:moduleIndex`}
                component={ModuleEditor}
              />
              <Route
                exact
                path={`${Routes.VERIFY_EMAIL_PAGE}`}
                component={VerifyEmail}
              />
              <Route exact path={`${Routes.LOGOUT_PAGE}`} component={Logout} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Router>
        </ChakraProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;
