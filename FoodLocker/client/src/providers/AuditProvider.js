import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const AuditContext = createContext();

export default (props) => {
    const apiUrl = "/api/audit"
    const [audit, setAudit] = useState({})
    const [audits, setAudits] = useState([])
    const { getToken } = useContext(UserContext)

    const getAuditsByUserId = async (userId) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/getByUser/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setAudits)
        )
    };

    const getAuditById = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setAudit)
        )
    };

    const saveAudit = async (audit) => {
        return await getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(audit)
            }).then(r => r.json()))
    };

    const updateAudit = async (audit) => {
        await getToken().then((token) =>
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

    const deleteAudit = async (auditId, userId) => {
        await getToken().then((token) =>
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
                audit,
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