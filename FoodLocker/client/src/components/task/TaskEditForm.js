import React, { useContext, useEffect, useState } from 'react';
import { Container, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default ({ toggleEditTaskModal, currentUser, updateTask, taskObj }) => {
    const classes = useStyles()
    const [updatedTask, setTask] = useState(taskObj);
    const { getEmployeesByUserId, employees } = useContext(EmployeeContext);
    const [selectedDate, setSelectedDate] = React.useState(new Date(taskObj.expirationDate));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const dateMod = new Date(date)
        const milliseconds = dateMod.getTime()
        const timeOffset = dateMod.getTimezoneOffset() * 60000
        const dateMinusOffset = (milliseconds - timeOffset)
        const formattedDate = new Date(dateMinusOffset).toJSON()
        const newTask = Object.assign({}, updatedTask);
        newTask.expirationDate = formattedDate;
        setTask(newTask);
    }

    const editTask = () => {
        updateTask({
            id: updatedTask.id,
            text: updatedTask.text,
            userId: currentUser.id,
            creationDate: updatedTask.creationDate,
            expirationDate: updatedTask.expirationDate,
            isCompleted: updatedTask.isCompleted,
            employeeId: updatedTask.employeeId
        });
        toggleEditTaskModal()
    }

    const handleControlledInputChange = (event) => {
        const newTask = Object.assign({}, updatedTask);
        newTask[event.target.name] = event.target.value;
        setTask(newTask);
    };

    useEffect(() => {
        getEmployeesByUserId(currentUser.id)
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form} onSubmit={e => {
                e.preventDefault()
                editTask()
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="text"
                            name="text"
                            variant="outlined"
                            required
                            defaultValue={taskObj.text}
                            fullWidth
                            id="taskText"
                            multiline
                            rows={5}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    name="expirationDate"
                                    margin="normal"
                                    id="expirationDate"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12} sm={12}>
                            <FormControl className={classes.formControl}>
                                <Select
                                    native="true"
                                    variant="outlined"
                                    defaultValue={taskObj.employeeId}
                                    onChange={handleControlledInputChange}
                                    inputProps={{
                                        name: 'employeeId',
                                        id: 'employee',
                                    }}
                                >
                                    <option value={taskObj.employeeId}>
                                        {taskObj.employee.firstName} {taskObj.employee.lastName}
                                    </option>
                                    {
                                        employees.map(e => {
                                            return (e.id === taskObj.employeeId)
                                                ? null
                                                :
                                                <option key={e.id} value={e.id}>
                                                    {e.firstName} {e.lastName}
                                                </option>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.submit}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}