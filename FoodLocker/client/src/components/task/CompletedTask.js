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
        position: 'relative',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 270,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 2
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
                            <strong>Task:</strong> {task.text}
                        </Typography>
                        <Typography>
                            <strong>Assigned To:</strong> {task.employee.firstName + " " + task.employee.lastName} <br />
                        </Typography>
                        <Typography>
                            <strong>Expiration Date:</strong> {date}
                        </Typography>
                        <Button className={classes.deleteButton} variant="contained" color="secondary" onClick={() => removeTask(task.id)}>Delete</Button>
                    </Paper>
                </Grid>
            }
        </>
    )
}