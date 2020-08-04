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
import CredentialDashboardView from '../credential/CredentialDashboardView';

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
        height: 310,
    },
    chartHeight: {
        height: 430,
    },
    resourcesHeight: {
        height: 190,
    }
}));


export default ({ barChartView, setBarChartView, toggleChartView, accountEditModal, toggleAccountEditModal, user }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    const { logout, getUserProfile, getAllUserProfiles, updateUser, users } = useContext(UserContext)
    const { getIncompleteTasksByUserId, getTasksByUserId, tasks } = useContext(TaskContext)
    const { getCredentialsByEmployeeId } = useContext(CredentialContext)
    const { getEmployeesByUserId, employees } = useContext(EmployeeContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { audits, getAuditsByUserId, getAuditById, saveAudit, updateAudit, deleteAudit } = useContext(AuditContext)

    // const handleDrawerClose = () => {
    //     employees.map(e => {
    //         console.log(e)
    //         getCredentialsByEmployeeId(e.id)
    //             .then(res => {
    //                 if (res.length !== 0) {
    //                     credentials.push(res)
    //                 } else {
    //                     return
    //                 }
    //                 console.log(credentials)
    //             })
    //     })
    // }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const chartHeightPaper = clsx(classes.paper, classes.chartHeight)
    const resourcesHeightPaper = clsx(classes.paper, classes.resourcesHeight)
    useEffect(() => {
        // getUserProfile(currentUser.firebaseUserId)
        //     .then(setUser)
        getTasksByUserId(currentUser.id);
        getEmployeesByUserId(currentUser.id);
        getAuditsByUserId(currentUser.id);
        getAllUserProfiles()
        // handleDrawerClose();
    }, [])
    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <SideNav user={user} toggleAccountEditModal={toggleAccountEditModal} />
                <main className={classes.content}>
                    {/* <div className={classes.appBarSpacer} /> */}
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={8}>
                                <Paper className={chartHeightPaper}>
                                    <div className="chartHeader">
                                        <Typography>
                                            Audit Records
                                        </Typography>
                                        <Button onClick={toggleChartView}>Toggle Chart</Button>
                                    </div>
                                    {/* <img className="a" src="data:image/jpeg;base64,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" /> */}
                                    <ChartTest audits={audits} barChartView={barChartView} />
                                </Paper>
                                <br />
                                <Paper className={resourcesHeightPaper}>
                                    <Typography>
                                        Food Safety Resources
                                    </Typography>
                                    <h1> <a href="https://www.fda.gov/food/food-safety-during-emergencies/food-safety-and-coronavirus-disease-2019-covid-19">Information on food safety and COVID-19</a></h1>
                                    <h1><a href="https://www.fda.gov/food/fda-food-code/state-retail-and-food-service-codes-and-regulations-state">Information on food regulations by state</a></h1>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper className={fixedHeightPaper}>
                                    <Typography>
                                        Tasks Completed
                                    </Typography>
                                    <TaskProgress tasks={tasks} />
                                    {/* <CircularProgress variant="static" value={90} /> */}
                                    {/* <img className="b" src="https://thumbs.dreamstime.com/b/business-to-do-list-flat-icon-modern-style-task-list-business-to-do-list-flat-icon-modern-style-any-purposes-perfect-web-138650221.jpg" /> */}
                                    {/* {tasks &&
                                        tasks.map(t => {
                                            const date = new Date(t.expirationDate).toLocaleDateString()
                                            return <p key={t.id}>{t.employee.firstName}-{date}-{t.text}</p>
                                        })
                                    } */}
                                </Paper>
                                <br />
                                <Paper className={fixedHeightPaper}>
                                    <Typography>
                                        Manage Credentials
                                    </Typography>
                                    {/* <CredentialDashboardView employees={employees} credentials={credentials} /> */}
                                    {/* {
                                        employees.map(e => {
                                            getCredentialsByEmployeeId(e.id)

                                            return (
                                                <>
                                                    <p>{e.id} {e.lastName}</p>
                                                    {
                                                        credentials.map(c => {
                                                            const date = new Date(c.expirationDate).toLocaleDateString()
                                                            return <p>{c.name} - Expires {date}</p>
                                                        })
                                                    }
                                                </>
                                            )

                                        })
                                    } */}
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            {/* <Grid item xs={12} md={6} lg={6}>
                                <Paper className={fixedHeightPaper}>
                                    <Typography>
                                        Manage Credentials
                                    </Typography>
                                    <img className="c" src="https://i.ya-webdesign.com/images/modern-vector-identity-card-4.png" />
                                    {
                                        employees.map(e => {
                                            getCredentialsByEmployeeId(e.id)

                                            return (
                                                <>
                                                    <p>{e.id} {e.lastName}</p>
                                                    {
                                                        credentials.map(c => {
                                                            const date = new Date(c.expirationDate).toLocaleDateString()
                                                            return <p>{c.name} - Expires {date}</p>
                                                        })
                                                    }
                                                </>
                                            )

                                        })
                                    }
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper className={fixedHeightPaper}>
                                    <Typography>
                                        Food Safety Resources
                                    </Typography>
                                    <img className="d" src="data:image/png;base64,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" />
                                </Paper>
                            </Grid> */}
                        </Grid>
                    </Container>
                </main>
                <AccountEditModal
                    user={user}
                    updateUser={updateUser}
                    accountEditModal={accountEditModal}
                    toggleAccountEditModal={toggleAccountEditModal}
                    users={users} />
            </div>
        </>
    )
}