import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { AuditContext } from '../../providers/AuditProvider';
import { Grid, Paper, Typography, Button, makeStyles, IconButton, Container, Divider } from '@material-ui/core';
import clsx from 'clsx';
import { AuditViolationContext } from '../../providers/AuditViolationProvider';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AuditDetailsCharts from './AuditDetailsCharts';
import { ViolationCategoryContext } from '../../providers/ViolationCategoryProvider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 270,
    },
    buttonColor: {
        backgroundColor: '#32CD32'
    },
    gridContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    chartWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    content: {
        backgroundColor: "whitesmoke",
        flexGrow: 1,
        paddingTop: 10,

    },
    backButton: {
        marginLeft: "1%"
    }
}));

export default () => {
    const { id } = useParams()
    const history = useHistory()
    const parsedId = parseInt(id)
    const classes = useStyles()
    const { getAuditById, audit } = useContext(AuditContext)
    const { auditViolations, getViolationsByAuditId } = useContext(AuditViolationContext)
    const { getAllViolationCategories, violationCategories } = useContext(ViolationCategoryContext)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    let i = 0;

    useEffect(() => {
        {
            getAuditById(parsedId)
            getViolationsByAuditId(parsedId)
            getAllViolationCategories()
        }
    }, [])

    return (
        <>
            <main className={classes.content}>
                <Button
                    onClick={() => history.push("/audits")}
                    className={classes.backButton}
                    variant="contained"
                    color="primary"
                >
                    <ArrowBackIcon />
                </Button>
                <Container maxWidth="lg">
                    <Grid container spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={classes.paper} elevation={3}>
                                <Typography variant="h4" align="center">Audit Details</Typography>
                                {audit &&
                                    <>
                                        <Typography className="taskListTyopgraphy">
                                            Date: {new Date(audit.auditDate).toLocaleDateString()}
                                        </Typography>
                                        <Typography>
                                            Score: {audit.score}
                                        </Typography>
                                        <Typography>
                                            Passed? {audit.passed ? "Yes" : "No"}
                                        </Typography>
                                        <Typography>
                                            Auditor Name: {audit.auditorName}
                                        </Typography>
                                        <Divider />
                                        <h2>Violations</h2>
                                        <Grid container spacing={3}>
                                            {
                                                auditViolations.map(a => (
                                                    <Grid item xs={12} sm={12} md={6} lg={6} key={a.id}>
                                                        <Typography><strong>Violation # {i += 1}</strong></Typography>
                                                        <Typography>Category: {a.violationCategory.name}</Typography>
                                                        <Typography>Issue: {a.description}</Typography>
                                                        <Typography>Critical issue ? : {a.isCritical ? "Yes" : "No"}</Typography><br />
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </>
                                }
                                <Divider />
                                <h2>Charts</h2>
                                <Grid container spacing={3}>
                                    <AuditDetailsCharts violations={auditViolations} violationCategories={violationCategories} />
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}