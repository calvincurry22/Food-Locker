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

export default ({ toggleEditCredentialModal, updateCredential, credentialObj }) => {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = React.useState(new Date(credentialObj.expirationDate));
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
                            defaultValue={credentialObj.name}
                            autoComplete="cname"
                            id="credentialName"
                            name="name"
                            label="Title"
                            variant="outlined"
                            required
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            defaultValue={credentialObj.renewalFee}
                            autoComplete="fee"
                            id="renewalFee"
                            name="renewalFee"
                            label="Renewal Fee"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    margin="normal"
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    id="expirationDate"
                                    name="expirationDate"
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