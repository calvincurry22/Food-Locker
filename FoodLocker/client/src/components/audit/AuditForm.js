import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="auditorName"
                        name="auditorName"
                        label="Auditor name"
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
                        <FormLabel component="legend">
                            Result Status
                        </FormLabel>
                        <RadioGroup
                            aria-label="passed"
                            name="passed"
                            defaultValue={audit.passed}
                            onChange={handleControlledInputChange}
                        >
                            <FormControlLabel
                                value='pass'
                                control={<Radio />}
                                label="Pass"
                            />
                            <FormControlLabel
                                value='fail'
                                control={<Radio />}
                                label="Fail"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}