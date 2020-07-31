import React from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { IconButton } from '@material-ui/core';


export default ({ credential, setCredentialObj, toggleEditCredentialModal, deleteCredential, employee }) => {

    const date = new Date(credential.expirationDate).toLocaleDateString()

    return (
        <div>
            <p>{credential.name}</p>
            <p>Expires:{date}</p>
            <p>Renewal Fee: ${credential.renewalFee}</p>
            <IconButton
                onClick={e => {
                    e.preventDefault()
                    setCredentialObj(credential)
                    toggleEditCredentialModal()
                }}
            >
                <EditOutlinedIcon />
            </IconButton>
            <IconButton
                onClick={e => {
                    e.preventDefault()
                    deleteCredential(credential.id, employee.id)
                }}>
                <DeleteForeverOutlinedIcon />
            </IconButton>
        </div>
    )
}