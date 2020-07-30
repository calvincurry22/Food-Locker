import React, { useContext, useState } from 'react';
import "./Task.css";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';

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

export default ({ task, deleteCompletedTask, currentUser }) => {
    const date = new Date(task.expirationDate).toLocaleDateString()
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    const removeTask = (id) => {
        deleteCompletedTask(id)
    }

    return (
        <>
            {task &&
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Typography className="taskListTyopgraphy">
                            Task: {task.text} <br />
                    Assigned To: {task.employee.firstName + " " + task.employee.lastName} <br />
                    Expiration Date: {date}
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={() => removeTask(task.id)}>Delete</Button>
                    </Paper>
                </Grid>
            }
        </>
    )
}