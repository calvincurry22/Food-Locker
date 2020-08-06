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

export default ({ toggleCredentialModal, saveCredential, employeeObj }) => {
    const classes = useStyles()
    const [credentialName, setCredentialName] = useState("")
    const [renewalFee, setRenewalFee] = useState("")
    const [selectedDate, setSelectedDate] = useState()

    const handleDateChange = (date) => {
        // const dateMod = new Date(date)
        // const milliseconds = dateMod.getTime()
        // const timeOffset = dateMod.getTimezoneOffset() * 60000
        // const dateMinusOffset = (milliseconds - timeOffset)
        // const formattedDate = new Date(dateMinusOffset).toJSON()
        setSelectedDate(date)
    }

    const createNewCredential = () => {
        saveCredential({
            employeeId: employeeObj.id,
            name: credentialName,
            expirationDate: selectedDate,
            renewalFee: renewalFee
        });
        toggleCredentialModal()
    }
    console.log(employeeObj)
    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form} onSubmit={e => {
                e.preventDefault()
                createNewCredential()
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={e => setCredentialName(e.target.value)}
                            autoComplete="cname"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="credentialName"
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={e => setRenewalFee(e.target.value)}
                                autoComplete="fee"
                                name="renewalFee"
                                variant="outlined"
                                required
                                fullWidth
                                id="renewalFee"
                                label="Renewal Fee"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
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
                        </Grid>
                        <Button type="submit" variant="contained">Save</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}