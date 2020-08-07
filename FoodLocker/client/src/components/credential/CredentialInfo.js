import React from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { IconButton, Tooltip } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';



export default ({
    credential,
    setCredentialObj,
    toggleEditCredentialModal,
    deleteCredential,
    employee
}) => {

    const date = new Date(credential.expirationDate).toLocaleDateString()

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {credential.name}
            </TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{credential.renewalFee}</TableCell>
            <TableCell align="right">
                <Tooltip title="Edit Credential">
                    <IconButton
                        onClick={e => {
                            e.preventDefault()
                            setCredentialObj(credential)
                            toggleEditCredentialModal()
                        }}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell align="right">
                <Tooltip title="Delete Credential">
                    <IconButton
                        onClick={e => {
                            e.preventDefault()
                            deleteCredential(credential.id, employee.id)
                        }}
                    >
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}