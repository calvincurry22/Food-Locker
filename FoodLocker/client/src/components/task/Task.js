import React, { useContext, useState } from 'react';
import "./Task.css";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

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

export default ({ task, updateTask, deleteTask, currentUser }) => {
    const date = new Date(task.expirationDate).toLocaleDateString()
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const [isChecked, setIsChecked] = useState(false)

    const removeTask = (id) => {
        deleteTask(id)
    }

    const completeTask = (taskObj) => {
        taskObj.isCompleted = true
        updateTask(taskObj)
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
                        <FormControlLabel
                            control={<Checkbox name="checkedA" color="primary" onChange={() => completeTask(task)} />}
                            label="Mark as completed"
                        />
                        <Button variant="contained">Edit</Button>
                        <Button variant="contained" color="secondary" onClick={() => removeTask(task.id)}>Delete</Button>
                    </Paper>
                </Grid>
            }
        </>
    )
}