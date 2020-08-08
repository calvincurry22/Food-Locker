import React, { useContext, useEffect } from 'react';
import AuditDetailsCharts from './AuditDetailsCharts';
import { useParams, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AuditContext } from '../../providers/AuditProvider';
import { AuditViolationContext } from '../../providers/AuditViolationProvider';
import { ViolationCategoryContext } from '../../providers/ViolationCategoryProvider';
import { Grid, Paper, Typography, Button, makeStyles, Container, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    gridContainer: {
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
    let i = 0;
    const { id } = useParams()
    const classes = useStyles()
    const history = useHistory()
    const parsedId = parseInt(id)
    const { getAuditById, audit } = useContext(AuditContext)
    const { auditViolations, getViolationsByAuditId } = useContext(AuditViolationContext)
    const { getAllViolationCategories, violationCategories } = useContext(ViolationCategoryContext)

    useEffect(() => {
        getAuditById(parsedId)
        getViolationsByAuditId(parsedId)
        getAllViolationCategories()
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
                                                        <Typography>
                                                            <strong>Violation # {i += 1}</strong>
                                                        </Typography>
                                                        <Typography>
                                                            Category: {a.violationCategory.name}
                                                        </Typography>
                                                        <Typography>
                                                            Issue: {a.description}
                                                        </Typography>
                                                        <Typography>
                                                            Critical issue ? : {a.isCritical ? "Yes" : "No"}
                                                        </Typography><br />
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </>
                                }
                                <Divider />
                                <h2>Charts</h2>
                                <Grid container spacing={3}>
                                    <AuditDetailsCharts
                                        violations={auditViolations}
                                        violationCategories={violationCategories}
                                    />
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}