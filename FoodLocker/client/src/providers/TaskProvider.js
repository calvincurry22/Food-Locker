import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const TaskContext = createContext();

export default (props) => {
    const apiUrl = "/api/task"
    const [tasks, setTasks] = useState([])
    const { getToken } = useContext(UserContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))

    const getTasksByUserId = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/getByUser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTasks)
        )
    };
    const getCompletedTasksByUserId = (id) => {
        debugger
        getToken().then((token) =>
            fetch(`${apiUrl}/completedTasksByUser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTasks)
        )
    };
    const getIncompleteTasksByUserId = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/incompleteTasksByUser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTasks)
        )
    };

    const getTaskById = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    const saveTask = (task) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            }).then(() => getIncompleteTasksByUserId(currentUser.id))
        );
    };

    const updateTask = (task) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${task.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            }).then(() => getIncompleteTasksByUserId(currentUser.id))
        )
    }

    const deleteTask = (taskId) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => getIncompleteTasksByUserId(currentUser.id))
        )
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                getTasksByUserId,
                getCompletedTasksByUserId,
                getIncompleteTasksByUserId,
                getTaskById,
                saveTask,
                updateTask,
                deleteTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );

}