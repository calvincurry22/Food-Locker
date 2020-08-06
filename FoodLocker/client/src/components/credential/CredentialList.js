import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header';
import { Container, Paper, Grid, List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Avatar, Button, CircularProgress, Tooltip, TableBody, TableHead, TableRow, TableCell, Table, TableContainer } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TimelineIcon from '@material-ui/icons/Timeline';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import SideNav from '../SideNav';
import { CredentialContext } from '../../providers/CredentialProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EmployeeEditModal from '../employee/EmployeeEditModal';
import Employee from '../employee/Employee';
import EmployeeCreateModal from '../employee/EmployeeCreateModal';
import CredentialCreateModal from './CredentialCreateModal';
import CredentialEditModal from './CredentialEditModal';
import EmployeeDeleteModal from '../employee/EmployeeDeleteModal';
import { UserContext } from '../../providers/UserProvider';

const drawerWidth = 270;
//test comment

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: 'whitesmoke'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        backgroundColor: "#EBECF0",
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        paddingTop: 10
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    tableContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    table: {
        maxWidth: 1300
    },
    fixedHeight: {
        height: 270,
    },
    newEmployeeButton: {
        marginLeft: '2%'
    }
}));

export default ({ setEmployeesWithoutCredentials, employeesWithoutCredentials }) => {
    const classes = useStyles()
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { getEmployeesByUserId, getEmployeeById, saveEmployee, updateEmployee, deleteEmployee, employees } = useContext(EmployeeContext)
    const { getCredentialsByEmployeeId, getCredentialById, saveCredential, updateCredential, deleteCredential, credentials } = useContext(CredentialContext)
    const [credentialModal, setCredentialModal] = useState(false)
    const toggleCredentialModal = () => setCredentialModal(!credentialModal)
    const [viewButton, setViewButton] = useState("View Completed Tasks")
    const [credentialObj, setCredentialObj] = useState({})
    const [deleteEmployeelModal, setDeleteEmployeeModal] = useState(false)
    const toggleDeleteEmployeeModal = () => setDeleteEmployeeModal(!deleteEmployeelModal)
    const [editCredentialModal, setEditCredentialModal] = useState(false)
    const toggleEditCredentialModal = () => setEditCredentialModal(!editCredentialModal)
    const [employeeModal, setEmployeeModal] = useState(false)
    const toggleEmployeeModal = () => setEmployeeModal(!employeeModal)
    const [taskObj, setTaskObj] = useState({})
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const [employeeEditModal, setEmployeeEditModal] = useState(false)
    const toggleEmployeeEditModal = () => setEmployeeEditModal(!employeeEditModal)
    const [employeeObj, setEmployeeObj] = useState({})
    const [employeeToDelete, setEmployeeToDelete] = useState({})
    const { logout, getUserProfile, getAllUserProfiles, updateUser, users } = useContext(UserContext)
    const arrayOfEmployeesWithoutCredentials = []
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
                                        credentials={credentials}
                                        setEmployeeToDelete={setEmployeeToDelete}
                                        setEmployeeObj={setEmployeeObj}
                                        setCredentialObj={setCredentialObj}
                                        deleteCredential={deleteCredential}
                                        deleteEmployee={deleteEmployee}
                                        toggleCredentialModal={toggleCredentialModal}
                                        toggleEditCredentialModal={toggleEditCredentialModal}
                                        toggleEmployeeEditModal={toggleEmployeeEditModal}
                                        toggleDeleteEmployeeModal={toggleDeleteEmployeeModal}
                                        getCredentialsByEmployeeId={getCredentialsByEmployeeId}
                                        arrayOfEmployeesWithoutCredentials={arrayOfEmployeesWithoutCredentials}
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