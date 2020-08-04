import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

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

export default ({ audit, idx }) => {
    const history = useHistory()
    const date = new Date(audit.auditDate).toLocaleDateString()
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
        <>
            {audit &&
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Typography variant="h6" align="center">
                            Record #{idx + 1}
                        </Typography>
                        <Typography className="taskListTyopgraphy">
                            Date: {audit.auditDate}
                        </Typography>
                        <Typography>
                            Score: {audit.score}
                        </Typography>
                        <Typography>
                            Passed? {audit.passed ? "Yes" : "No"}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => {
                                history.push(`/audit/${audit.id}`)
                            }}
                        >
                            Details
                        </Button>
                    </Paper>
                </Grid>
            }
        </>
    )
}