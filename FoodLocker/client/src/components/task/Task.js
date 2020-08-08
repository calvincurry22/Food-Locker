import React from 'react';
import "./Task.css";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox, Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    cardspace: {
        display: "flex",
        minHeight: 200,
        wordWrap: "break-word",
        flexDirection: "column",
        position: "relative",
        paddingLeft: 15,
        paddingTop: 5
    }
}));

export default ({ task, updateTask, deleteTask, toggleEditTaskModal, setTaskObj }) => {
    const date = new Date(task.expirationDate).toLocaleDateString()
    const classes = useStyles()

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
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={classes.cardspace}>
                        <Typography>
                            <strong>Task:</strong> {task.text}
                        </Typography>
                        <Typography>
                            <strong>Assigned To:</strong>
                            {task.employee.firstName + " " + task.employee.lastName} <br />
                        </Typography>
                        <Typography>
                            <strong>Expiration Date:</strong> {date}
                        </Typography>
                        <Divider />
                        <FormControlLabel
                            control={<Checkbox name="checkedA" color="primary"
                                onChange={() => completeTask(task)} />}
                            label="Mark as completed"
                        />
                        <div className="editDeleteButtonsContainer">
                            <Button
                                className="editButton"
                                variant="contained"
                                onClick={() => {
                                    setTaskObj(task)
                                    toggleEditTaskModal()
                                }}>
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="deleteButton"
                                onClick={() => removeTask(task.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            }
        </>
    )
}