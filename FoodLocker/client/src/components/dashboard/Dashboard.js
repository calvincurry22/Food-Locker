import React, { useEffect, useContext, useState } from 'react';
import CredentialDashboardView from '../credential/CredentialDashboardView';
import DashboardResources from '../foodSafetyResources/DashboardResources';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import AuditDashboardChart from '../audit/AuditDashboardChart';
import { AuditContext } from '../../providers/AuditProvider';
import { Container, Paper, Grid, CircularProgress } from '@material-ui/core';
import { TaskContext } from '../../providers/TaskProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TaskProgress from '../task/TaskProgress';
import SideNav from '../SideNav';
import "./Dashboard.css";
import clsx from 'clsx';



const drawerWidth = 270;
//test comment

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
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


export default ({ barChartView, toggleChartView }) => {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const { getTasksByUserId, tasks } = useContext(TaskContext)
    const { getEmployeesByUserId } = useContext(EmployeeContext)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { audits, getAuditsByUserId } = useContext(AuditContext)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const chartHeightPaper = clsx(classes.paper, classes.chartHeight)
    const resourcesHeightPaper = clsx(classes.paper, classes.resourcesHeight)


    useEffect(() => {
        // async function fetchData() {
        //     await getTasksByUserId(currentUser.id);
        //     await getEmployeesByUserId(currentUser.id);
        //     await getAuditsByUserId(currentUser.id);
        //     setLoading(false);
        // }

        async function fetchData() {
            let response = await Promise.all([
                getTasksByUserId(currentUser.id),
                getEmployeesByUserId(currentUser.id),
                getAuditsByUserId(currentUser.id)
            ])
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <div className={classes.root}>
            {loading ?
                <CircularProgress />
                :
                <>
                    <CssBaseline />
                    <SideNav />
                    <main className={classes.content}>
                        <Container maxWidth="lg" className={classes.container}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8} lg={8}>
                                    <Paper className={chartHeightPaper} elevation={3}>
                                        {audits[0] ?
                                            <AuditDashboardChart
                                                audits={audits}
                                                barChartView={barChartView}
                                                toggleChartView={toggleChartView}
                                            />
                                            :
                                            <Typography variant="h5">No audits to view</Typography>
                                        }
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
                                                :
                                                <>
                                                    <br />
                                                    <Typography variant="h5">
                                                        No current tasks
                                                </Typography>
                                                </>
                                        }
                                    </Paper>
                                    <br />
                                    <Paper className={fixedHeightPaper} elevation={3}>
                                        <Typography variant="h6">
                                            Employee Credentials
                                    </Typography>
                                        <CredentialDashboardView />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </>
            }
        </div>
    )
}