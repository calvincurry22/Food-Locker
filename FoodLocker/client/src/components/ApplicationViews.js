import React, { useContext, useState } from "react";
import FoodSafetyResources from "./foodSafetyResources/FoodSafetyResources";
import { Switch, Route, Redirect } from "react-router-dom";
import CredentialList from "./credential/CredentialList";
import AccountEditForm from "./account/AccountEditForm";
import { UserContext } from "../providers/UserProvider";
import AuditCreateForm from "./audit/AuditCreateForm";
import AuditDetails from "./audit/AuditDetails";
import Dashboard from "./dashboard/Dashboard";
import AuditList from "./audit/AuditList";
import TaskList from "./task/TaskList";
import Register from "./Register";
import Login from "./Login";



export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserContext);
    const [barChartView, setBarChartView] = useState(true)
    const toggleChartView = () => setBarChartView(!barChartView)
    console.log(React.version)
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ?
                        <Dashboard
                            barChartView={barChartView}
                            toggleChartView={toggleChartView}
                        />
                        : <Redirect to="/login" />
                    }
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/tasks">
                    {isLoggedIn ? <TaskList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/credentials">
                    {isLoggedIn ? <CredentialList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/audits">
                    {isLoggedIn ? <AuditList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/audit/:id">
                    {isLoggedIn ? <AuditDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/createAudit">
                    {isLoggedIn ? <AuditCreateForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/accountSettings">
                    {isLoggedIn ? <AccountEditForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/resources">
                    {isLoggedIn ? <FoodSafetyResources /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};