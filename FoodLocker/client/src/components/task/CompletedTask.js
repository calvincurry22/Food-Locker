import React from 'react';
import clsx from 'clsx';
import "./Task.css";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button } from '@material-ui/core';

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

export default ({ task, deleteCompletedTask }) => {
    const classes = useStyles()
    const date = new Date(task.expirationDate).toLocaleDateString()
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
                            <strong>Task: </strong>
                            {task.text}
                        </Typography>
                        <Typography>
                            <strong>Assigned To:</strong>
                            {task.employee.fullName} <br />
                        </Typography>
                        <Typography>
                            <strong>Expiration Date:</strong> {date}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.deleteButton}
                            onClick={() => removeTask(task.id)}
                        >
                            Delete
                        </Button>
                    </Paper>
                </Grid>
            }
        </>
    )
}