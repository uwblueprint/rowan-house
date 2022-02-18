import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./components/auth/PrivateRoute";
import CreatePage from "./components/pages/CreatePage";
import Default from "./components/pages/Default";
import DisplayPage from "./components/pages/DisplayPage";
import NotFound from "./components/pages/NotFound";
import UpdatePage from "./components/pages/UpdatePage";
import AdminDasboard from "./components/pages/admin/AdminDashboard";
import CourseDashboard from "./components/pages/course/CourseDashboard";
import CourseEditor from "./components/pages/course/CourseEditor";
import CourseEditorOverview from "./components/pages/course/CourseEditorOverview";
import CourseOverview from "./components/pages/course/CourseOverview";
import * as Routes from "./constants/Routes";
import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import AuthContext from "./contexts/AuthContext";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";
import EditTeamInfoPage from "./components/pages/EditTeamPage";
import HooksDemo from "./components/pages/HooksDemo";

import { AuthenticatedUser } from "./types/AuthTypes";

const App = (): React.ReactElement => {
  const currentUser: AuthenticatedUser = getLocalStorageObj<AuthenticatedUser>(
    AUTHENTICATED_USER_KEY,
  );

  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(
    currentUser,
  );

  // Some sort of global state. Context API replaces redux.
  // Split related states into different contexts as necessary.
  // Split dispatcher and state into separate contexts as necessary.
  const [sampleContext, dispatchSampleContextUpdate] = useReducer(
    sampleContextReducer,
    DEFAULT_SAMPLE_CONTEXT,
  );

  return (
    <SampleContext.Provider value={sampleContext}>
      <SampleContextDispatcherContext.Provider
        value={dispatchSampleContextUpdate}
      >
        <AuthContext.Provider
          value={{ authenticatedUser, setAuthenticatedUser }}
        >
          <Router>
            <Switch>
              <Route exact path={Routes.LOGIN_PAGE} component={Login} />
              <Route exact path={Routes.SIGNUP_PAGE} component={Signup} />
              <PrivateRoute exact path={Routes.HOME_PAGE} component={Default} />
              <PrivateRoute
                exact
                path={Routes.CREATE_ENTITY_PAGE}
                component={CreatePage}
              />
              <PrivateRoute
                exact
                path={Routes.UPDATE_ENTITY_PAGE}
                component={UpdatePage}
              />
              <PrivateRoute
                exact
                path={Routes.DISPLAY_ENTITY_PAGE}
                component={DisplayPage}
              />
              <PrivateRoute
                exact
                path={Routes.EDIT_TEAM_PAGE}
                component={EditTeamInfoPage}
              />
              <PrivateRoute
                exact
                path={Routes.HOOKS_PAGE}
                component={HooksDemo}
              />
              <PrivateRoute
                exact
                path={Routes.ADMIN_DASHBOARD_PAGE}
                component={AdminDasboard}
              />
              <PrivateRoute
                exact
                path={Routes.COURSE_OVERVIEW_DASHBOARD_BASE_ROUTE}
                component={CourseDashboard}
              />
              <PrivateRoute
                exact
                path={`${Routes.COURSE_OVERVIEW_DASHBOARD_BASE_ROUTE}/:id`}
                component={CourseOverview}
              />
              <PrivateRoute
                exact
                path={Routes.ADMIN_COURSE_EDITOR_BASE_ROUTE}
                component={CourseEditorOverview}
              />
              <PrivateRoute
                exact
                path={`${Routes.ADMIN_COURSE_EDITOR_BASE_ROUTE}/:id`}
                component={CourseEditor}
              />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      </SampleContextDispatcherContext.Provider>
    </SampleContext.Provider>
  );
};

export default App;
