import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../providers/UserProvider";
import Dashboard from "./dashboard/Dashboard";
import SideNav from "./SideNav";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <main>

            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/dashboard">
                    <Dashboard />
                </Route>


            </Switch>
        </main>
    );
};