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
        position: 'relative',
        right: 0
    },
}));

export default ({ toggleEmployeeModal, currentUser, saveEmployee }) => {
    const classes = useStyles()
    const [employeeTitle, setEmployeetitle] = useState("")
    const [employeeLastName, setEmployeeLastName] = useState("")
    const [employeeFirstName, setEmployeeFirstName] = useState("")

    const createNewEmployee = () => {
        saveEmployee({
            firstName: employeeFirstName,
            lastName: employeeLastName,
            userId: currentUser.id,
            title: employeeTitle
        });
        toggleEmployeeModal()
    }

    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form} onSubmit={e => {
                e.preventDefault()
                createNewEmployee()
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={e => setEmployeeFirstName(e.target.value)}
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={e => setEmployeeLastName(e.target.value)}
                            autoComplete="lname"
                            name="lastName"
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={e => setEmployeetitle(e.target.value)}
                            autoComplete="title"
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" className={classes.submit}>Save</Button>
            </form>
        </Container >
    )
}