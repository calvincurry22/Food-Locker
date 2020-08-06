import React, { useState, useContext, useEffect, useRef } from 'react';
import { Grid, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel, TextField, Select, Typography, Button } from '@material-ui/core';
import { ViolationCategoryContext } from '../../providers/ViolationCategoryProvider';


export default ({ audit, violationCategories, blankViolation, violations, setViolations }) => {

    const [radioValue, setRadioValue] = useState('')
    const description = useRef()

    const addViolation = () => {
        setViolations([...violations, { ...blankViolation }]);
    };

    const handleViolationChange = (e) => {
        console.log()
        console.log(e.target.value)
        const updatedViolations = [...violations];
        if (e.target.name === 'violationCategoryId') {
            updatedViolations[e.target.id][e.target.name] = parseInt(e.target.value);
        } else {
            updatedViolations[e.target.id][e.target.name] = e.target.value;
        }
        setViolations(updatedViolations);
        console.log(violations)
    };

    return (
        <form>
            <h2>Violations</h2>
            <Button variant="outlined" onClick={addViolation}>Add new issue</Button>
            <br />
            {
                violations.map((val, idx) => {
                    console.log(idx)

                    const isCriticalId = `isCritical-${idx}`;
                    const violationCategoryId = `violationCategoryId-${idx}`;
                    const descriptionId = `descriptionId-${idx}`;
                    return (

                        <Grid key={idx} container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                {/* <Typography variant='h6'>Issue #{idx + 1}</Typography> */}
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        // id={descriptionId}
                                        // name={descriptionId}
                                        label="description"
                                        fullWidth
                                        multiline
                                        ref={description}
                                        variant="outlined"
                                        rows={2}
                                        value={violations[idx].description}
                                        autoComplete="description"
                                        // defaultValue={violations[idx].description}
                                        onChange={handleViolationChange}
                                        inputProps={{
                                            name: "description",
                                            id: idx
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <FormLabel component="legend">Select Category</FormLabel>
                                    <Select
                                        native
                                        variant="outlined"
                                        className="violationCategoryId"
                                        data-idx={idx}
                                        value={val.violationCategoryId}
                                        onChange={handleViolationChange}
                                        inputProps={{
                                            name: "violationCategoryId",
                                            id: idx,
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        {
                                            violationCategories.map(v => {
                                                return <option key={v.id} value={v.id}>{v.name}</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Critical Violation?</FormLabel>
                                    <RadioGroup aria-label="passed" className="isCritical" data-idx={idx} name={isCriticalId} value={val.isCritical} onChange={handleViolationChange}>
                                        <FormControlLabel value='no' control={<Radio inputProps={{ name: "isCritical", id: idx }} />} label="No" />
                                        <FormControlLabel value='yes' control={<Radio inputProps={{ name: "isCritical", id: idx }} />} label="Yes" />
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
