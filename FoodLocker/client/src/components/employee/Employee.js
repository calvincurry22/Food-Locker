import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox, Tooltip } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CredentialInfo from '../credential/CredentialInfo';
import { CredentialContext } from '../../providers/CredentialProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 300,
    },
    buttonColor: {
        backgroundColor: '#32CD32'
    }
}));

export default ({ employee, setEmployeeObj, arrayOfEmployeesWithoutCredentials, toggleCredentialModal, setCredentialObj, toggleEditCredentialModal, deleteCredential, getCredentialsByEmployeeId, toggleEmployeeEditModal, toggleDeleteEmployeeModal, setEmployeeToDelete }) => {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const [isChecked, setIsChecked] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [credentials, setCredentials] = useState([])
    const { getEmployeesByUserId, getEmployeeById, saveEmployee, updateEmployee, deleteEmployee, employees } = useContext(EmployeeContext)
    // const { getCredentialsByEmployeeId, getCredentialById, saveCredential, updateCredential, deleteCredential } = useContext(CredentialContext)

    // const removeTask = (id) => {
    //     deleteTask(id)
    // }

    // const completeTask = (taskObj) => {
    //     taskObj.isCompleted = true
    //     updateTask(taskObj)
    // }

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
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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