import React, { useContext, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../providers/UserProvider";
import Dashboard from "./dashboard/Dashboard";
import TaskList from "./task/TaskList";
import CredentialList from "./credential/CredentialList";
import AuditList from "./audit/AuditList";
import AuditDetails from "./audit/AuditDetails";
import AuditCreateForm from "./audit/AuditCreateForm";
import ChartTest from "./ChartTest";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserContext);
    const [barChartView, setBarChartView] = useState(true)
    const toggleChartView = () => setBarChartView(!barChartView)

    return (
        <main>

            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Dashboard barChartView={barChartView} setBarChartView={setBarChartView} toggleChartView={toggleChartView} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    {isLoggedIn ? <Register /> : <Redirect to="/login" />}
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

                <Route path="/chart">
                    {isLoggedIn ? <ChartTest /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};