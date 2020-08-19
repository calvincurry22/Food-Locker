import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const EmployeeContext = createContext();

export default (props) => {
    const apiUrl = "/api/employee"
    const [employees, setEmployees] = useState([])
    const { getToken } = useContext(UserContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))

    const getEmployeesByUserId = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/getByUser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setEmployees)
        )
    };

    const getEmployeeById = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    const saveEmployee = async (employee) => {
        await getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            }).then(() => getEmployeesByUserId(currentUser.id))
        );
    };

    const updateEmployee = async (employee) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${employee.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employee),
            }).then(() => getEmployeesByUserId(currentUser.id))
        )
    }

    const deleteEmployee = async (employeeId) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${employeeId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => getEmployeesByUserId(currentUser.id))
        )
    }

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                getEmployeesByUserId,
                getEmployeeById,
                saveEmployee,
                updateEmployee,
                deleteEmployee
            }}
        >
            {props.children}
        </EmployeeContext.Provider>
    );

}