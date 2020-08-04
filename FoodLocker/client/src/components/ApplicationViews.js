import React, { useContext, useState, useEffect } from "react";
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
import AccountEditForm from "./account/AccountEditForm";
import FoodSafetyResources from "./FoodSafetyResources";


export default function ApplicationViews() {
    const { isLoggedIn, getUserProfile } = useContext(UserContext);
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const [barChartView, setBarChartView] = useState(true)
    const toggleChartView = () => setBarChartView(!barChartView)
    const [accountEditModal, setAccountEditModal] = useState(false)
    const toggleAccountEditModal = () => setAccountEditModal(!accountEditModal)
    const [user, setUser] = useState({})

    useEffect(() => {
        getUserProfile(currentUser.firebaseUserId)
            .then(setUser)
    })

    return (
        <main>

            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ?
                        <Dashboard
                            user={user}
                            barChartView={barChartView}
                            setBarChartView={setBarChartView}
                            toggleChartView={toggleChartView}
                            accountEditModal={accountEditModal}
                            toggleAccountEditModal={toggleAccountEditModal}
                        />
                        : <Redirect to="/login" />
                    }
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    {isLoggedIn ? <Register /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tasks">
                    {isLoggedIn ? <TaskList user={user} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/credentials">
                    {isLoggedIn ? <CredentialList user={user} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/audits">
                    {isLoggedIn ? <AuditList user={user} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/audit/:id">
                    {isLoggedIn ? <AuditDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/createAudit">
                    {isLoggedIn ? <AuditCreateForm user={user} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/accountSettings">
                    {isLoggedIn ? <AccountEditForm user={user} setUser={setUser} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/resources">
                    {isLoggedIn ? <FoodSafetyResources user={user} /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};