import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { TaskContext } from '../../providers/TaskProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
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

export default ({ toggleTaskModal, currentUser }) => {
    const { saveTask } = useContext(TaskContext);
    const { getEmployeesByUserId, employees } = useContext(EmployeeContext);
    const [taskText, setTaskText] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [employeeId, setEmployeeId] = useState();

    const createNewTask = () => {
        save({
            text: taskText,
            userId: currentUser.id,
            expirationDate: expirationDate,
            employeeId: employeeId
        })
    }


    useEffect(() => {
        getEmployeesByUserId(currentUser.id)
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form} onSubmit={createNewTask}>
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
                            label="text"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={e => setExpirationDate(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="taskExpirationDate"
                            label="Expiration Date"
                            name="expirationDate"
                            autoComplete="lname"
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="expirationDate"
                                    label="Set Expiration Date"
                                    onChange={e => setExpirationDate(e.target.value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <InputLabel htmlFor="employee">Select Employee</InputLabel>
                                    <NativeSelect
                                        native
                                        value={0}
                                        onChange={e => setEmployeeId(e.target.value)}
                                        inputProps={{
                                            name: 'employee',
                                            id: 'employee',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        {
                                            employees.map(e => {
                                                return <option value={e.id}>{e.firstName} {e.lastName}</option>
                                            })
                                        }
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Button type="submit" variant="contained">Save</Button>
                </Grid>
            </form>
        </Container >
    )
}