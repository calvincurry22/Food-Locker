import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header';
import "./Dashboard.css";
import { Container, Paper, Grid, List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Avatar, CircularProgress, Button } from '@material-ui/core';
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
import ChartTest from '../ChartTest';
import { AuditContext } from '../../providers/AuditProvider';
import TaskProgress from '../task/TaskProgress';
import AccountEditModal from '../account/AccountEditModal';
import DashboardResources from '../foodSafetyResources/DashboardResources';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

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
        backgroundColor: "#EBECF0",
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
        height: 310,
    },
    chartHeight: {
        height: 430,
    },
    resourcesHeight: {
        height: 190,
    }
}));


export default ({ barChartView, setBarChartView, toggleChartView, accountEditModal, toggleAccountEditModal, employeesWithoutCredentials }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    const { logout, getUserProfile, getAllUserProfiles, updateUser, users } = useContext(UserContext)
    const { getIncompleteTasksByUserId, getTasksByUserId, tasks } = useContext(TaskContext)
    const { getCredentialsByEmployeeId, credentials } = useContext(CredentialContext)
    const { getEmployeesByUserId, employees } = useContext(EmployeeContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { audits, getAuditsByUserId, getAuditById, saveAudit, updateAudit, deleteAudit } = useContext(AuditContext)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const chartHeightPaper = clsx(classes.paper, classes.chartHeight)
    const resourcesHeightPaper = clsx(classes.paper, classes.resourcesHeight)
    const [credentialProgress, setCredentialProgress] = useState([])
    let arrayofEmployees = []



    useEffect(() => {
        getTasksByUserId(currentUser.id);
        getEmployeesByUserId(currentUser.id);
        getAuditsByUserId(currentUser.id);
    }, [])

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <SideNav toggleAccountEditModal={toggleAccountEditModal} />
                <main className={classes.content}>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={8}>
                                <Paper className={chartHeightPaper} elevation={3}>
                                    <ChartTest audits={audits} barChartView={barChartView} toggleChartView={toggleChartView} />
                                </Paper>
                                <br />
                                <Paper className={resourcesHeightPaper} elevation={3}>
                                    <DashboardResources />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper className={fixedHeightPaper} elevation={3}>
                                    <Typography variant="h6">
                                        Tasks Completed
                                    </Typography>
                                    {
                                        (tasks.length !== 0) ?
                                            <TaskProgress tasks={tasks} />
                                            : <Typography variant="h5">No current tasks</Typography>
                                    }
                                </Paper>
                                <br />
                                <Paper className={fixedHeightPaper} elevation={3}>
                                    <Typography>
                                        Manage Credentials
                                    </Typography>
                                    <CircularProgressbar value={arrayofEmployees} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </>
    )
}