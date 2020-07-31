import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuditContext } from '../../providers/AuditProvider';
import { Grid, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { AuditViolationContext } from '../../providers/AuditViolationProvider';

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
    }
}));

export default () => {
    const { id } = useParams()
    const parsedId = parseInt(id)
    const classes = useStyles()
    const { getAuditById, audit } = useContext(AuditContext)
    const { auditViolations, getViolationsByAuditId } = useContext(AuditViolationContext)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    let i = 0;

    useEffect(() => {
        {
            getAuditById(parsedId)
            getViolationsByAuditId(parsedId)
        }
    }, [])
    return (

        <Grid item xs={12} md={12} lg={9}>
            <Link to="/audits">Back</Link>
            <h1>Audit Details</h1>
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
                    <h2>Violations</h2>
                    {
                        auditViolations.map(a => {

                            return (
                                <div key={a.id}>
                                    <Typography>Issue # {i += 1}</Typography>
                                    <Typography>Category: {a.violationCategory.name}</Typography>
                                    <Typography>Issue: {a.description}</Typography>
                                    <Typography>Critical issue ? : {a.isCritical ? "Yes" : "No"}</Typography><br />
                                </div>
                            )
                        })
                    }
                </>
            }
        </Grid>
    )
}