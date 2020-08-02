import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { InputLabel, FormLabel, FormControl, Radio, RadioGroup } from '@material-ui/core';

export default ({ value, setValue, audit, setAudit }) => {

    const handleControlledInputChange = (event) => {
        const newAudit = Object.assign({}, audit)
        if (event.target.name === "score") {
            newAudit[event.target.name] = parseInt(event.target.value);
        } else {
            newAudit[event.target.name] = event.target.value;
        }
        setAudit(newAudit);
        console.log(audit);
    };

    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
        console.log(value);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                General Info
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="auditorName"
                        name="auditorName"
                        label="Auitor name"
                        fullWidth
                        autoComplete="given-name"
                        defaultValue={audit.auditorName}
                        onChange={handleControlledInputChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputLabel htmlFor="auditDate">Audit Date*</InputLabel>
                    <TextField
                        required
                        id="auditDate"
                        name="auditDate"
                        type="date"
                        fullWidth
                        autoComplete="Audit Date"
                        defaultValue={audit.auditDate}
                        onChange={handleControlledInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <InputLabel htmlFor="score">Score*</InputLabel>
                    <TextField
                        id="score"
                        name="score"
                        // label="Score"
                        fullWidth
                        autoComplete="Audit Score"
                        defaultValue={audit.score}
                        type="number"
                        onChange={handleControlledInputChange}
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Result Status</FormLabel>
                        <RadioGroup aria-label="passed" name="passed" value={value} onChange={handleChange}>
                            <FormControlLabel value='pass' control={<Radio />} label="Pass" />
                            <FormControlLabel value='fail' control={<Radio />} label="Fail" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}