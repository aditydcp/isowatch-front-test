import React from "react";
import { Route, Switch } from 'react-router-dom'

const Page1 = React.lazy(() => import('../pages/Page1'))
const Login = React.lazy(() => import('../pages/Login'))

const Routes = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.path}`} component={Page1} exact />
            <Route path={`${match.path}login`} component={Login} exact />
        </Switch>
    )
}

export default Routes