import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../providers/UserProvider";
import Dashboard from "./dashboard/Dashboard";
import TaskList from "./task/TaskList";


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
                    {isLoggedIn ? <Register /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tasks">
                    {isLoggedIn ? <TaskList /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};