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

export default ({ toggleEditCredentialModal, updateCredential, credentialObj }) => {
    const { getEmployeesByUserId, employees } = useContext(EmployeeContext);
    const [taskText, setTaskText] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = React.useState(new Date(credentialObj.expirationDate));
    const [employeeId, setEmployeeId] = useState(0)
    const [updatedCredential, setCredential] = useState(credentialObj);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const dateMod = new Date(date)
        const milliseconds = dateMod.getTime()
        const timeOffset = dateMod.getTimezoneOffset() * 60000
        const dateMinusOffset = (milliseconds - timeOffset)
        const formattedDate = new Date(dateMinusOffset).toJSON()
        const newCredential = Object.assign({}, updatedCredential);
        newCredential.expirationDate = formattedDate;
        setCredential(newCredential);
    }

    const editCredential = () => {
        updateCredential({
            id: updatedCredential.id,
            employeeId: updatedCredential.employeeId,
            name: updatedCredential.name,
            expirationDate: updatedCredential.expirationDate,
            renewalFee: updatedCredential.renewalFee
        });
        toggleEditCredentialModal()
    }

    const handleControlledInputChange = (event) => {
        const newCredential = Object.assign({}, updatedCredential);
        newCredential[event.target.name] = event.target.value;
        setCredential(newCredential);
    };

    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form} onSubmit={e => {
                e.preventDefault()
                editCredential()
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="cname"
                            name="name"
                            variant="outlined"
                            required
                            defaultValue={credentialObj.name}
                            fullWidth
                            id="credentialName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="fee"
                            name="renewalFee"
                            variant="outlined"
                            required
                            defaultValue={credentialObj.renewalFee}
                            fullWidth
                            id="renewalFee"
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
                        <Button type="submit" variant="contained">Save</Button>
                    </Grid>
                </Grid>
            </form>
        </Container >
    )
}