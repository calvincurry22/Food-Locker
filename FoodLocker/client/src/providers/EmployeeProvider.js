import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const EmployeeContext = createContext();

export default (props) => {
    const apiUrl = "/api/employee"
    const [employees, setEmployees] = useState([])
    const { getToken } = useContext(UserContext)

    const getEmployeesByUserId = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/getByUser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setEmployees)
        )
    };

    const getEmployeeById = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    const saveEmployee = (employee) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            }).then(() => getEmployeesByUserId(employee.userId))
        );
    };

    const updateEmployee = (employee) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${employee.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employee),
            }).then(() => getEmployeesByUserId(employee.userId))
        )
    }

    const deleteEmployee = (employeeId, userId) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${employeeId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => getEmployeesByUserId(userId))
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