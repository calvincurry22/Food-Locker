import React, { useState, useEffect, useContext } from 'react';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CssBaseline from '@material-ui/core/CssBaseline';
import { UserContext } from '../providers/UserProvider';
import TimelineIcon from '@material-ui/icons/Timeline';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { useHistory } from 'react-router-dom';
import "./dashboard/Dashboard.css";
import clsx from 'clsx';
import {
    List,
    Avatar,
    Backdrop,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    CircularProgress
} from '@material-ui/core';

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
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
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
    }
}));


export default () => {
    const classes = useStyles()
    const history = useHistory()
    const [open, setOpen] = useState(true)
    const [user, setUser] = useState({})
    const { logout, getUserProfile } = useContext(UserContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))

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