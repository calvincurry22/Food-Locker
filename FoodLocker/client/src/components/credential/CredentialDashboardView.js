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
import DashboardEmployee from '../employee/DashboardEmployee';

const drawerWidth = 270;
//test comment


export default ({ setEmployeesWithoutCredentials, employeesWithoutCredentials }) => {

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
            <div >
                <CssBaseline />

                <main >


                    <List>

                        {employees.map(e => (
                            <DashboardEmployee
                                key={e.id}
                                employee={e}
                                credentials={credentials}
                                getCredentialsByEmployeeId={getCredentialsByEmployeeId}
                            />
                        ))}

                    </List>
                </main>
            </div>
        </>
    )
}