import React from "react";
import { Route, Switch } from "react-router-dom";

import StudentPage from './pages/student/student.page';

function AppRouter() {
    return (
        <Switch>
            <Route exact path="/" component={StudentPage} />
        </Switch>
    );
}

export default AppRouter;
