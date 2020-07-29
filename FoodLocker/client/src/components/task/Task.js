import React, { useContext } from 'react';
import "./Task.css";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button } from '@material-ui/core';

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
}));

export default ({ task, updateTask, deleteTask }) => {
    const date = new Date(task.expirationDate).toLocaleDateString()
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
                <Typography className="taskListTyopgraphy">
                    Task: {task.text} <br />
                    Assigned To: {task.employee.firstName + " " + task.employee.lastName} <br />
                    Expiration Date: {date}
                </Typography>
                <Button variant="contained">Completed</Button>
                <Button>Delete</Button>
            </Paper>
        </Grid>
    )
}