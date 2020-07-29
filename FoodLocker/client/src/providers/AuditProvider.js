import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const AuditContext = createContext();

export default (props) => {
    const apiUrl = "/api/audit"
    const [audits, setAudits] = useState([])
    const { getToken } = useContext(UserContext)

    const getAuditsByUserId = (userId) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/getByUser/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setAudits)
        )
    };

    const getAuditById = (id) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    const saveAudit = (audit) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(audit)
            }).then(() => getAuditsByUserId(audit.userId))
        );
    };

    const updateAudit = (audit) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${audit.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(audit),
            }).then(() => getAuditsByUserId(audit.userId))
        )
    }

    const deleteAudit = (auditId, userId) => {
        getToken().then((token) =>
            fetch(`${apiUrl}/${auditId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => getAuditsByUserId(userId))
        )
    }

    return (
        <AuditContext.Provider
            value={{
                audits,
                getAuditsByUserId,
                getAuditById,
                saveAudit,
                updateAudit,
                deleteAudit
            }}
        >
            {props.children}
        </AuditContext.Provider>
    );

}