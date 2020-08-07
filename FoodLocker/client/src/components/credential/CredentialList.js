import React, { useState, useEffect, useContext } from 'react';
import { Button, TableBody, TableHead, TableRow, TableCell, Table, TableContainer } from '@material-ui/core';
import { CredentialContext } from '../../providers/CredentialProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import EmployeeDeleteModal from '../employee/EmployeeDeleteModal';
import EmployeeCreateModal from '../employee/EmployeeCreateModal';
import EmployeeEditModal from '../employee/EmployeeEditModal';
import CredentialCreateModal from './CredentialCreateModal';
import CssBaseline from '@material-ui/core/CssBaseline';
import CredentialEditModal from './CredentialEditModal';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Employee from '../employee/Employee';
import SideNav from '../SideNav';


const drawerWidth = 270;
//test comment

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: 'whitesmoke'
    },
    content: {
        backgroundColor: "#EBECF0",
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        paddingTop: 10
    },
    tableContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    table: {
        maxWidth: 1300
    },
    newEmployeeButton: {
        marginLeft: '2%'
    }
}));

export default () => {
    const { getCredentialsByEmployeeId, saveCredential, updateCredential, deleteCredential } = useContext(CredentialContext)
    const { getEmployeesByUserId, saveEmployee, updateEmployee, deleteEmployee, employees } = useContext(EmployeeContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const [credentialModal, setCredentialModal] = useState(false)
    const toggleCredentialModal = () => setCredentialModal(!credentialModal)
    const [credentialObj, setCredentialObj] = useState({})
    const [deleteEmployeelModal, setDeleteEmployeeModal] = useState(false)
    const toggleDeleteEmployeeModal = () => setDeleteEmployeeModal(!deleteEmployeelModal)
    const [editCredentialModal, setEditCredentialModal] = useState(false)
    const toggleEditCredentialModal = () => setEditCredentialModal(!editCredentialModal)
    const [employeeModal, setEmployeeModal] = useState(false)
    const toggleEmployeeModal = () => setEmployeeModal(!employeeModal)
    const [employeeEditModal, setEmployeeEditModal] = useState(false)
    const toggleEmployeeEditModal = () => setEmployeeEditModal(!employeeEditModal)
    const [employeeToDelete, setEmployeeToDelete] = useState({})
    const [employeeObj, setEmployeeObj] = useState({})
    const classes = useStyles()


    useEffect(() => {
        getEmployeesByUserId(currentUser.id);
    }, [])

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <SideNav />
                <main className={classes.content}>
                    <Typography
                        variant="h4"
                        align="center"
                    >
                        Manage Employee Credentials
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.newEmployeeButton}
                        onClick={toggleEmployeeModal}
                    >
                        New Employee
                    </Button>
                    <TableContainer className={classes.tableContainer}>
                        <Table aria-label="collapsible table" className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell><strong>First Name</strong></TableCell>
                                    <TableCell><strong>Last Name</strong></TableCell>
                                    <TableCell><strong>Title</strong></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map(e => (
                                    <Employee
                                        key={e.id}
                                        employee={e}
                                        setEmployeeToDelete={setEmployeeToDelete}
                                        setEmployeeObj={setEmployeeObj}
                                        setCredentialObj={setCredentialObj}
                                        deleteCredential={deleteCredential}
                                        toggleCredentialModal={toggleCredentialModal}
                                        toggleEditCredentialModal={toggleEditCredentialModal}
                                        toggleEmployeeEditModal={toggleEmployeeEditModal}
                                        toggleDeleteEmployeeModal={toggleDeleteEmployeeModal}
                                        getCredentialsByEmployeeId={getCredentialsByEmployeeId}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <EmployeeCreateModal
                        toggleEmployeeModal={toggleEmployeeModal}
                        saveEmployee={saveEmployee}
                        employeeModal={employeeModal}
                        currentUser={currentUser}
                    />
                    <CredentialCreateModal
                        toggleCredentialModal={toggleCredentialModal}
                        credentialModal={credentialModal}
                        saveCredential={saveCredential}
                        employeeObj={employeeObj}
                        currentUser={currentUser}
                    />
                    <CredentialEditModal
                        toggleEditCredentialModal={toggleEditCredentialModal}
                        editCredentialModal={editCredentialModal}
                        updateCredential={updateCredential}
                        credentialObj={credentialObj}
                    />
                    <EmployeeEditModal
                        toggleEmployeeEditModal={toggleEmployeeEditModal}
                        updateEmployee={updateEmployee}
                        employeeEditModal={employeeEditModal}
                        employeeObj={employeeObj}
                    />
                    <EmployeeDeleteModal
                        deleteEmployeelModal={deleteEmployeelModal}
                        toggleDeleteEmployeeModal={toggleDeleteEmployeeModal}
                        deleteEmployee={deleteEmployee}
                        employeeToDelete={employeeToDelete}
                    />
                </main>
            </div>
        </>
    )
}