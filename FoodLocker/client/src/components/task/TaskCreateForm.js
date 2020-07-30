import React, { useContext, useEffect, useState } from 'react';
import { Container, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import { TaskContext } from '../../providers/TaskProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    avatar: {
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.main,
        backgroundColor: "#32CD32"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default ({ toggleTaskModal, currentUser, saveTask }) => {
    const { getEmployeesByUserId, employees } = useContext(EmployeeContext);
    const [taskText, setTaskText] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-07-15T21:11:54'));
    const [employeeId, setEmployeeId] = useState(0)

    const handleDateChange = (date) => {
        const dateMod = new Date(date)
        const milliseconds = dateMod.getTime()
        const timeOffset = dateMod.getTimezoneOffset() * 60000
        const dateMinusOffset = (milliseconds - timeOffset)
        const formattedDate = new Date(dateMinusOffset).toJSON()
        setSelectedDate(formattedDate)
    }

    const handleNameChange = (event) => {
        setEmployeeId(event.target.value)
    }

    const createNewTask = () => {
        saveTask({
            text: taskText,
            userId: currentUser.id,
            expirationDate: selectedDate,
            employeeId: employeeId
        });
        toggleTaskModal()
    }


    useEffect(() => {
        getEmployeesByUserId(currentUser.id)
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form} onSubmit={e => {
                e.preventDefault()
                createNewTask()
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={e => setTaskText(e.target.value)}
                            autoComplete="fname"
                            name="text"
                            variant="outlined"
                            required
                            fullWidth
                            id="taskText"
                            multiline
                            rows={5}
                            label="Type Task Here"
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
                                    margin="normal"
                                    id="expirationDate"
                                    label="Set Expiration Date"
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
                                <InputLabel htmlFor="employee">Assign To</InputLabel>
                                <Select
                                    native="true"
                                    variant="outlined"
                                    value={employeeId}
                                    onChange={handleNameChange}
                                    inputProps={{
                                        name: 'employee',
                                        id: 'employee',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {
                                        employees.map(e => {
                                            return <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Button type="submit" variant="contained">Save</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}