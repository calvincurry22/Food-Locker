import React from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { IconButton, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default ({ credential, setCredentialObj, toggleEditCredentialModal, deleteCredential, employee }) => {

    const date = new Date(credential.expirationDate).toLocaleDateString()

    return (
        // <div>
        //     <p>{credential.name}</p>
        //     <p>Expires:{date}</p>
        //     <p>Renewal Fee: ${credential.renewalFee}</p>
        //     <IconButton
        //         onClick={e => {
        //             e.preventDefault()
        //             setCredentialObj(credential)
        //             toggleEditCredentialModal()
        //         }}
        //     >
        //         <EditOutlinedIcon />
        //     </IconButton>
        //     <IconButton
        //         onClick={e => {
        //             e.preventDefault()
        //             deleteCredential(credential.id, employee.id)
        //         }}>
        //         <DeleteForeverOutlinedIcon />
        //     </IconButton>
        // </div>
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
                        }}>
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}