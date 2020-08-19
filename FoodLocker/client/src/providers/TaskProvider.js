import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const TaskContext = createContext();

export default (props) => {
    const apiUrl = "/api/task"
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const { getToken } = useContext(UserContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))

    const getTasksByUserId = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/getByUser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTasks)
        )
    };
    const getCompletedTasksByUserId = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/completedTasksByUser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCompletedTasks)
        )
    };
    const getIncompleteTasksByUserId = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/incompleteTasksByUser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTasks)
        )
    };

    const getTaskById = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    const saveTask = async (task) => {
        await getToken().then((token) =>
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

    const updateTask = async (task) => {
        await getToken().then((token) =>
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

    const deleteTask = async (taskId) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => getIncompleteTasksByUserId(currentUser.id))
        )
    }

    const deleteCompletedTask = async (taskId) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => getCompletedTasksByUserId(currentUser.id))
        )
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                completedTasks,
                getTasksByUserId,
                getCompletedTasksByUserId,
                getIncompleteTasksByUserId,
                getTaskById,
                saveTask,
                updateTask,
                deleteTask,
                deleteCompletedTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );

}