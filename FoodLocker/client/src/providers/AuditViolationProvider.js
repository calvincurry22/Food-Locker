import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const AuditViolationContext = createContext();

export default (props) => {
    const apiUrl = "/api/auditViolation"
    const [auditViolations, setAuditViolations] = useState([])
    const { getToken } = useContext(UserContext)

    const getViolationsByAuditId = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/getByAudit/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setAuditViolations)
        )
    };

    const getViolationById = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    const saveViolation = async (violation) => {
        await getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(violation)
            }).then(() => getViolationsByAuditId(violation.auditId))
        );
    };

    const updateViolation = async (violation) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${violation.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(violation),
            }).then(() => getViolationsByAuditId(violation.auditId))
        )
    }

    const deleteViolation = async (violationId, auditId) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${violationId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => getViolationsByAuditId(auditId))
        )
    }

    return (
        <AuditViolationContext.Provider
            value={{
                auditViolations,
                getViolationsByAuditId,
                getViolationById,
                saveViolation,
                updateViolation,
                deleteViolation
            }}
        >
            {props.children}
        </AuditViolationContext.Provider>
    );

}