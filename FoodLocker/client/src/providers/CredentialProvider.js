import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';
import { EmployeeContext } from './EmployeeProvider';
import { useHistory } from 'react-router-dom';

export const CredentialContext = createContext();

export default (props) => {
    const apiUrl = "/api/credential"
    const { getToken } = useContext(UserContext)
    const [credentials, setCredentials] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { getEmployeesByUserId } = useContext(EmployeeContext)
    const history = useHistory()

    const getCredentialsByEmployeeId = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getByEmployee/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    const getCredentialById = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    const saveCredential = (credential) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credential)
            }).then(() => window.location.reload(true))
        );
    };

    const updateCredential = (credential) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${credential.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credential),
            }).then(() => window.location.reload(true))
        )
    }

    const deleteCredential = (credentialId, employeeId) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${credentialId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => window.location.reload(true))
        )
    }

    return (
        <CredentialContext.Provider
            value={{
                credentials,
                getCredentialsByEmployeeId,
                getCredentialById,
                saveCredential,
                updateCredential,
                deleteCredential
            }}
        >
            {props.children}
        </CredentialContext.Provider>
    );

}