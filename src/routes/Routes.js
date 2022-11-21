import React from "react";
import { Route, Switch } from 'react-router-dom'

const Dashboard = React.lazy(() => import('../pages/Dashboard'))
const Login = React.lazy(() => import('../pages/Login'))

const Routes = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.path}`} component={Dashboard} exact />
            <Route path={`${match.path}login`} component={Login} exact />
        </Switch>
    )
}

export default Routes