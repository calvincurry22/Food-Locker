import React from 'react';
import SideNav from '../SideNav';
import './FoodSafetyResources.css';
import { Grid, Typography, Paper, makeStyles, Container } from '@material-ui/core';

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
    }
}));

export default () => {
    const classes = useStyles()


    return (
        <>
            <div className={classes.root}>
                <SideNav />
                <main className={classes.content}>
                    <br />
                    <Typography variant="h4" align="center"> Food Safety Resources</Typography>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h5">
                                        <a
                                            className="resourcePageLinks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.fda.gov/media/137867/download"
                                        >
                                            COVID-19 Re-opening Food Safety Checklist
                                        </a>
                                    </Typography>
                                    <Typography>
                                        A checklist that can be used to verify that important
                                        food safety practices have been considered when in the
                                        process of re-starting your business during the COVID-19 pandemic.
                                    </Typography>
                                </Paper>
                                <br />
                                <Paper className={classes.paper}>
                                    <Typography variant="h5">
                                        <a
                                            className="resourcePageLinks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.fda.gov/food/fda-food-code/state-retail-and-food-service-codes-and-regulations-state"
                                        >
                                            Food Safety Regulations by state
                                        </a>
                                    </Typography>
                                    <Typography>
                                        Information on all food safety regulations by US state
                                </Typography>
                                </Paper>
                                <br />
                                <Paper className={classes.paper}>
                                    <Typography variant="h5">
                                        <a
                                            className="resourcePageLinks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets"
                                        >
                                            Food Safety Fact Sheets
                                        </a>
                                    </Typography>
                                    <Typography>
                                        This page provides multiple fact sheets that give quick tips
                                        on topic such as: properly handling of potentially hazardous foods,
                                        how to properly use thermometers, foodborne illness info, etc.
                                </Typography>
                                </Paper>
                                <br />
                                <Paper className={classes.paper}>
                                    <Typography variant="h5">
                                        <a
                                            className="resourcePageLinks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets/!ut/p/a1/jY_RCoJAFES_pQ9Y7jVN8lGEUEtFpNr2JZbaVaFccZeivj6jpyLLO08XzswwwIACa_ilLrmpVcNPz5-5e8zRtbwA48yzFhilmzxbBgHOi1kP7H4AqT3SP3A-_vPHIwqmXRIkJbCWm4rUjVRAS2EIb_RVdBqoVOpINJfC3IjkB0N0JYTRsAX2no5Wryi1CyeMUxsz5xP4Mv8FDO9rz2t6X4VYR_7kAeoGtjg!/?1dmy&urile=wcm%3apath%3a%2FFSIS-Content%2Finternet%2Fmain%2Ftopics%2Ffood-safety-education"
                                        >
                                            Food Safety Education
                                        </a>
                                    </Typography>
                                    <Typography>
                                        A great resource for furthuring food safety knowledge.
                                        Here you can find educational materials that can be used
                                        to train your staff on food safety fundamentals.
                                    </Typography>
                                </Paper>
                                <br />
                                <Paper className={classes.paper}>
                                    <Typography variant="h5">
                                        <a
                                            className="resourcePageLinks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.fsis.usda.gov/wps/portal/fsis/topics/recalls-and-public-health-alerts/current-recalls-and-alerts"
                                        >
                                            USDA Recalls
                                        </a>
                                    </Typography>
                                    <Typography>
                                        Up-to-date record of all UDSA food recalls
                                    </Typography>
                                </Paper>
                                <br />
                                <Paper className={classes.paper}>
                                    <Typography variant="h5">
                                        <a
                                            className="resourcePageLinks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts"
                                        >
                                            FDA Recalls
                                        </a>
                                    </Typography>
                                    <Typography>
                                        Up-to-date record of all FDA food recalls
                                    </Typography>
                                </Paper>
                                <br />
                                <Paper className={classes.paper}>
                                    <Typography variant="h5">
                                        <a
                                            className="resourcePageLinks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/hazard-analysis-critical-control-point-haccp"
                                        >
                                            HACCP Information
                                        </a>
                                    </Typography>
                                    <Typography>
                                        A helpful resource that can be referenced when creating
                                        a HACCP plan for your establishment.
                                    </Typography>
                                </Paper>
                                <br />
                                <Paper className={classes.paper}>
                                    <Typography variant="h5">
                                        <a
                                            className="resourcePageLinks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.business.com/articles/guide-to-food-handler-safety-certifications/"
                                        >
                                            Restaurant Food Handler Certification Guide
                                        </a>
                                    </Typography>
                                    <Typography>
                                        Information regarding certifications required to operate a food establishment
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </>
    )
}