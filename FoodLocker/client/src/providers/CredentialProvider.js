import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const CredentialContext = createContext();

export default (props) => {
    const apiUrl = "/api/credential"
    const { getToken } = useContext(UserContext)
    const [credentials, setCredentials] = useState([])

    const getCredentialsByEmployeeId = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getByEmployee/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCredentials)
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
            }).then(() => getCredentialsByEmployeeId(credential.employeeId))
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
            }).then(() => getCredentialsByEmployeeId(credential.employeeId))
        )
    }

    const deleteCredential = (credentialId, employeeId) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${credentialId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => getCredentialsByEmployeeId(employeeId))
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