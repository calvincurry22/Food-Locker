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
import AuditDashboardChart from "./audit/AuditDashboardChart";
import AccountEditForm from "./account/AccountEditForm";
import FoodSafetyResources from "./foodSafetyResources/FoodSafetyResources";
import SideNav from "./SideNav";


export default function ApplicationViews() {
    const { isLoggedIn, getUserProfile } = useContext(UserContext);
    const [barChartView, setBarChartView] = useState(true)
    const toggleChartView = () => setBarChartView(!barChartView)
    const [accountEditModal, setAccountEditModal] = useState(false)
    const toggleAccountEditModal = () => setAccountEditModal(!accountEditModal)
    const [user, setUser] = useState({})
    const [employeesWithoutCredentials, setEmployeesWithoutCredentials] = useState([])


    return (
        <main>
            {/* {isLoggedIn &&
                <SideNav />
            } */}
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
                            employeesWithoutCredentials={employeesWithoutCredentials}
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
                    {isLoggedIn ? <TaskList user={user} /> : <Redirect to="/login" />}
                </Route>

                <Route path="/credentials">
                    {isLoggedIn ?
                        <CredentialList
                            user={user}
                            employeesWithoutCredentials={employeesWithoutCredentials}
                            setEmployeesWithoutCredentials={setEmployeesWithoutCredentials}
                        />
                        : <Redirect to="/login" />
                    }
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