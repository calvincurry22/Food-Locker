import React, { useState, useEffect, useContext } from 'react';
import "./dashboard/Dashboard.css";
import { Container, Paper, Grid, List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Avatar, Backdrop, CircularProgress } from '@material-ui/core';
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
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

const drawerWidth = 270;
//test comment

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
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
    largeName: {
        fontSize: "0.7em"
    },
    smallName: {
        fontSize: "9px !important"
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
    const [open, setOpen] = React.useState(true)
    const { logout, getUserProfile } = useContext(UserContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const history = useHistory()
    const [user, setUser] = useState({})

    useEffect(() => {
        getUserProfile(currentUser.firebaseUserId)
            .then(setUser)
    }, [])

    const handleDrawerClose = () => {
        console.log(user)
        setOpen(!open);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        {open
                            ? <ChevronLeftIcon />
                            : <ChevronRightIcon />
                        }
                    </IconButton>
                </div>
                <Divider />
                {user.hasOwnProperty('firstName') ?
                    <List>
                        <ListItem className="avatar">
                            <ListItemAvatar>
                                {user.image ?
                                    <Avatar
                                        className={classes.large}
                                        src={user.image}
                                    />
                                    :
                                    <Avatar
                                        className={classes.large}
                                        src="https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg"
                                    />
                                }
                            </ListItemAvatar>
                            <ListItemText primary={user.firstName + " " + user.lastName} />
                            <ListItemText primary={user.businessName} />
                        </ListItem>
                        <ListItem
                            className="menuItems"
                            button
                            onClick={() => history.push("/")}>
                            <ListItemIcon>
                                <DashboardOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem
                            className="menuItems"
                            button
                            onClick={() => history.push("/audits")}
                        >
                            <ListItemIcon>
                                <TimelineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Audit Records" />
                        </ListItem>
                        <ListItem
                            className="menuItems"
                            button
                            onClick={() => history.push("/credentials")}
                        >
                            <ListItemIcon>
                                <CardMembershipIcon />
                            </ListItemIcon>
                            <ListItemText primary="Employee Credentials" />
                        </ListItem>
                        <ListItem
                            className="menuItems"
                            button
                            onClick={() => history.push("/tasks")}>
                            <ListItemIcon>
                                <AssignmentTurnedInOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Manage Tasks" />
                        </ListItem >
                        <ListItem className="menuItems" button onClick={() => history.push("/resources")}>
                            <ListItemIcon>
                                <LibraryBooksOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Food Safety Resources" />
                        </ListItem>
                        <ListItem className="menuItems" button>
                            <ListItemIcon>
                                <ExitToAppOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" onClick={logout} />
                        </ListItem>
                    </List>
                    : <Backdrop open={open}>
                        <CircularProgress color="primary" />
                    </Backdrop>
                }
            </Drawer>
        </div>
    )
}