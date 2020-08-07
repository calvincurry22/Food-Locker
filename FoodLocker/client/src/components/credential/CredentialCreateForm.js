import React, { useState } from 'react';
import { Container, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    }
}));

export default ({ toggleCredentialModal, saveCredential, employeeObj }) => {
    const classes = useStyles()
    const [renewalFee, setRenewalFee] = useState("")
    const [credentialName, setCredentialName] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleDateChange = (date) => {
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
                            id="credentialName"
                            variant="outlined"
                            name="name"
                            label="Name"
                            required
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={e => setRenewalFee(e.target.value)}
                                autoComplete="fee"
                                id="renewalFee"
                                variant="outlined"
                                name="renewalFee"
                                label="Renewal Fee"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        margin="normal"
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        id="expirationDate"
                                        value={selectedDate}
                                        label="Set Expiration Date"
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