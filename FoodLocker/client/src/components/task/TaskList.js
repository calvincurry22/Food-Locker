import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header';
import { Container, Paper, Grid, List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Avatar, Button, CircularProgress, Tooltip } from '@material-ui/core';
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
import { UserContext } from '../../providers/UserProvider';
import SideNav from '../SideNav';
import { TaskContext } from '../../providers/TaskProvider';
import { CredentialContext } from '../../providers/CredentialProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import "./Task.css";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TaskCreateModal from './TaskCreateModal';
import Task from './Task';
import CompletedTask from './CompletedTask';

const drawerWidth = 270;
//test comment

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
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
    fixedHeight: {
        height: 270,
    },
}));

export default () => {
    const classes = useStyles()

    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { getIncompleteTasksByUserId, getCompletedTasksByUserId, tasks, deleteTask, updateTask, saveTask, deleteCompletedTask, completedTasks } = useContext(TaskContext)
    const [taskModal, setTaskModal] = useState(false)
    const toggleTaskModal = () => setTaskModal(!taskModal)
    const [viewingNewTasks, setViewingNewTasks] = useState(true)
    const [viewButton, setViewButton] = useState("View Completed Tasks")
    const [pageTitle, setPageTitle] = useState("Current Tasks")
    const toggleView = () => setViewingNewTasks(!viewingNewTasks)

    useEffect(() => {
        if (viewingNewTasks) {
            getIncompleteTasksByUserId(currentUser.id)
            setViewButton("View Completed Tasks");
            setPageTitle("Current Tasks")
        } else {
            getCompletedTasksByUserId(currentUser.id)
            setViewButton("View Current Tasks");
            setPageTitle("Completed Tasks")
        }
    }, [viewingNewTasks])

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <SideNav />
                <main className={classes.content}>
                    <Button variant="contained" onClick={toggleView}>{viewButton}</Button>
                    <h2>{pageTitle}</h2>
                    <Tooltip title="Add Task">
                        <Fab aria-label="add" size="medium" onClick={toggleTaskModal}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={4}>
                            {
                                (viewingNewTasks)
                                    ? (tasks.map(t => {
                                        return <Task key={t.id} task={t} updateTask={updateTask} deleteTask={deleteTask} currentUser={currentUser} />
                                    }))
                                    : completedTasks.map(t => {
                                        return <CompletedTask key={t.id} task={t} currentUser={currentUser} deleteCompletedTask={deleteCompletedTask} />
                                    })
                            }
                        </Grid>
                    </Container>
                    <TaskCreateModal
                        currentUser={currentUser}
                        toggleTaskModal={toggleTaskModal}
                        taskModal={taskModal}
                        saveTask={saveTask}
                    />
                </main>
            </div>
        </>
    )
}