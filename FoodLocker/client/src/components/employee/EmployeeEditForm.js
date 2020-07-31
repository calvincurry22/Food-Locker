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

export default ({ toggleEmployeeEditModal, updateEmployee, employeeObj }) => {
    const { getEmployeesByUserId, employees } = useContext(EmployeeContext);
    const [taskText, setTaskText] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const classes = useStyles()
    const [employeeId, setEmployeeId] = useState(0)
    const [updatedEmployee, setEmployee] = useState(employeeObj);

    const editEmployee = () => {
        updateEmployee({
            id: updatedEmployee.id,
            firstName: updatedEmployee.firstName,
            lastName: updatedEmployee.lastName,
            userId: updatedEmployee.userId,
            title: updatedEmployee.title
        });
        toggleEmployeeEditModal()
    }

    const handleControlledInputChange = (event) => {
        const newEmployee = Object.assign({}, updatedEmployee);
        newEmployee[event.target.name] = event.target.value;
        setEmployee(newEmployee);
    };

    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form} onSubmit={e => {
                e.preventDefault()
                editEmployee()
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            defaultValue={employeeObj.firstName}
                            fullWidth
                            id="empFirstName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="lname"
                            name="lastName"
                            variant="outlined"
                            required
                            defaultValue={employeeObj.lastName}
                            fullWidth
                            id="empLastName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="title"
                            name="title"
                            variant="outlined"
                            required
                            defaultValue={employeeObj.title}
                            fullWidth
                            id="empTitle"
                            autoFocus
                        />
                    </Grid>
                    <Button type="submit" variant="contained">Save</Button>
                </Grid>
            </form>
        </Container >
    )
}