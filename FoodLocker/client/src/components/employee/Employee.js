import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CredentialInfo from '../credential/CredentialInfo';
import { Typography, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Collapse from '@material-ui/core/Collapse';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';



export default ({
    employee,
    setEmployeeObj,
    setCredentialObj,
    deleteCredential,
    setEmployeeToDelete,
    toggleCredentialModal,
    toggleEmployeeEditModal,
    toggleEditCredentialModal,
    toggleDeleteEmployeeModal,
    getCredentialsByEmployeeId,
}) => {

    const [open, setOpen] = React.useState(false);
    const [credentials, setCredentials] = useState([])



    useEffect(() => {
        getCredentialsByEmployeeId(employee.id)
            .then(setCredentials)
    }, [])

    return (
        <>
            {employee &&
                <>
                    <TableRow>
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon />
                                    : <KeyboardArrowDownIcon />
                                }
                            </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {employee.firstName}
                        </TableCell>
                        <TableCell>{employee.lastName}</TableCell>
                        <TableCell>{employee.title}</TableCell>
                        <TableCell align="right">
                            <Button
                                onClick={() => {
                                    setEmployeeObj(employee)
                                    toggleCredentialModal()
                                }} variant="contained"
                            >
                                Add Credential
                           </Button>
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                onClick={e => {
                                    e.preventDefault()
                                    setEmployeeObj(employee)
                                    toggleEmployeeEditModal()
                                }}
                            >
                                Edit
                        </Button>
                        </TableCell>
                        <TableCell align="right">
                            <Button
                                variant="contained"
                                onClick={e => {
                                    e.preventDefault()
                                    setEmployeeToDelete(employee)
                                    toggleDeleteEmployeeModal()
                                }}
                            >
                                Delete
                        </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        <strong>Credentials</strong>
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>Title</strong></TableCell>
                                                <TableCell><strong>Expiration Date</strong></TableCell>
                                                <TableCell><strong>Renewal Fee</strong></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {credentials.map(c => (
                                                <CredentialInfo
                                                    key={c.id}
                                                    credential={c}
                                                    employee={employee}
                                                    deleteCredential={deleteCredential}
                                                    setCredentialObj={setCredentialObj}
                                                    toggleCredentialModal={toggleCredentialModal}
                                                    toggleEditCredentialModal={toggleEditCredentialModal}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </>
            }
        </>
    )
}