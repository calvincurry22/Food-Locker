import React, { useEffect, useContext, useState } from 'react';
import { Grid, Typography, Paper, makeStyles, Container } from '@material-ui/core';
import SideNav from './SideNav';
import { UserContext } from '../providers/UserProvider';


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
    const { logout, getUserProfile, getAllUserProfiles, updateUser, users } = useContext(UserContext)


    return (
        <>
            <div className={classes.root}>
                <SideNav />
                <main className={classes.content}>
                    <h1> Food Safety Resources</h1>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="h4">
                                    <a href="https://www.fda.gov/media/137867/download">COVID-19 Re-opening Food Safety Checklist</a>
                                </Typography>
                                <Typography variant="h4">
                                    <a href="https://www.fda.gov/food/fda-food-code/state-retail-and-food-service-codes-and-regulations-state">Food Safety Regulations by state</a>
                                </Typography>
                                <Typography variant="h4">
                                    <a href="https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets">Food Safety Fact Sheets</a>
                                </Typography>
                                <Typography variant="h4">
                                    <a href="https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets/!ut/p/a1/jY_RCoJAFES_pQ9Y7jVN8lGEUEtFpNr2JZbaVaFccZeivj6jpyLLO08XzswwwIACa_ilLrmpVcNPz5-5e8zRtbwA48yzFhilmzxbBgHOi1kP7H4AqT3SP3A-_vPHIwqmXRIkJbCWm4rUjVRAS2EIb_RVdBqoVOpINJfC3IjkB0N0JYTRsAX2no5Wryi1CyeMUxsz5xP4Mv8FDO9rz2t6X4VYR_7kAeoGtjg!/?1dmy&urile=wcm%3apath%3a%2FFSIS-Content%2Finternet%2Fmain%2Ftopics%2Ffood-safety-education">Food Safety Education</a>
                                </Typography>
                                <Typography variant="h4">
                                    <a href="https://www.fsis.usda.gov/wps/portal/fsis/topics/recalls-and-public-health-alerts/current-recalls-and-alerts">USDA Recalls</a>
                                </Typography>
                                <Typography variant="h4">
                                    <a href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts">FDA Recalls</a>
                                </Typography>
                                <Typography variant="h4">
                                    <a href="https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/hazard-analysis-critical-control-point-haccp">HACCP Information</a>
                                </Typography>
                                <Typography variant="h4">
                                    <a href="https://www.business.com/articles/guide-to-food-handler-safety-certifications/">Restaurant Food Handler Certification Guide</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </>
    )
}