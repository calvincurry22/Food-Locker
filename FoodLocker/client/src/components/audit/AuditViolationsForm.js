import React, { useRef } from 'react';
import './Audit.css';
import {
    Grid,
    Radio,
    Button,
    Select,
    FormLabel,
    TextField,
    RadioGroup,
    FormControl,
    FormControlLabel,
} from '@material-ui/core';


export default ({ violationCategories, blankViolation, violations, setViolations }) => {

    const description = useRef()

    const addViolation = () => {
        setViolations([...violations, { ...blankViolation }]);
    };

    const handleViolationChange = (e) => {
        const updatedViolations = [...violations];
        if (e.target.name === 'violationCategoryId') {
            updatedViolations[e.target.id][e.target.name] = parseInt(e.target.value);
        } else {
            updatedViolations[e.target.id][e.target.name] = e.target.value;
        }
        setViolations(updatedViolations);
    };

    return (
        <form className="violationsForm">
            <h2>Violations</h2>
            <Button variant="outlined" onClick={addViolation}>Add new issue</Button>
            <br />
            {
                violations.map((val, idx) => {
                    const isCriticalId = `isCritical-${idx}`;

                    return (

                        <Grid key={idx} container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        rows={2}
                                        required
                                        fullWidth
                                        multiline
                                        ref={description}
                                        variant="outlined"
                                        label="description"
                                        autoComplete="description"
                                        onChange={handleViolationChange}
                                        value={violations[idx].description}
                                        inputProps={{
                                            name: "description",
                                            id: idx
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <FormLabel component="legend">
                                        Select Category
                                    </FormLabel>
                                    <Select
                                        native
                                        variant="outlined"
                                        className="violationCategoryId"
                                        value={val.violationCategoryId}
                                        onChange={handleViolationChange}
                                        inputProps={{
                                            name: "violationCategoryId",
                                            id: idx,
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        {
                                            violationCategories.map(v => (
                                                <option key={v.id} value={v.id}>
                                                    {v.name}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Critical Violation?
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="passed"
                                        className="isCritical"
                                        name={isCriticalId}
                                        value={val.isCritical}
                                        onChange={handleViolationChange}
                                    >
                                        <FormControlLabel
                                            value='no'
                                            label="No"
                                            control={<Radio inputProps={{ name: "isCritical", id: idx }} />}
                                        />
                                        <FormControlLabel
                                            value='yes'
                                            label="Yes"
                                            control={<Radio inputProps={{ name: "isCritical", id: idx }} />}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )
                })
            }
        </form >
    )
}
