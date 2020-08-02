import React, { useState, useContext, useEffect } from 'react';
import { Grid, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel, TextField, Select } from '@material-ui/core';
import { ViolationCategoryContext } from '../../providers/ViolationCategoryProvider';


export default ({ audit, violationCategories }) => {


    const blankViolation = { auditId: audit.id, isCritical: '', violationCategoryId: '', description: '' };
    const [violations, setViolations] = useState([
        { ...blankViolation }
    ]);

    const addViolation = () => {
        setViolations([...violations, { ...blankViolation }]);
    };


    return (
        <form>
            <label htmlFor="owner">Owner</label>
            <input type="text" name="owner" id="owner" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />
            <input
                type="button"
                value="Add New Cat"
                onClick={addViolation}
            />
            {
                violations.map((val, idx) => {
                    console.log(idx)
                    console.log(val)
                    const isCriticalId = `isCritical-${idx}`;
                    const violationCategoryId = `violationCategoryId-${idx}`;
                    const descriptionId = `descriptionId-${idx}`;
                    return (
                        // < div key={`cat-${idx}`
                        // }>
                        //     <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
                        //     <input
                        //         type="text"
                        //         name={catId}
                        //         data-idx={idx}
                        //         id={catId}
                        //         className="name"
                        //     />
                        //     <label htmlFor={ageId}>Age</label>
                        //     <input
                        //         type="text"
                        //         name={ageId}
                        //         data-idx={idx}
                        //         id={ageId}
                        //         className="age"
                        //     />
                        // </div>
                        <Grid key={idx} container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id={descriptionId}
                                    name={descriptionId}
                                    label="Description"
                                    data-idx={idx}
                                    fullWidth
                                    multiline
                                    rows={8}
                                    autoComplete="description"
                                    defaultValue={val.description}
                                // onChange={handleControlledInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl>
                                    <FormLabel component="legend">Select Category</FormLabel>
                                    <Select
                                        native
                                        variant="outlined"
                                        data-idx={idx}
                                        value={val.violationCategoryId}
                                        // onChange={handleNameChange}
                                        inputProps={{
                                            name: violationCategoryId,
                                            id: violationCategoryId,
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
                                    <RadioGroup aria-label="passed" data-idx={idx} name={isCriticalId} value={val.isCritical} /*onChange={handleChange}*/>
                                        <FormControlLabel value='no' control={<Radio />} label="No" />
                                        <FormControlLabel value='yes' control={<Radio />} label="Yes" />
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
// import React from 'react';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

// export default ({ audit }) => {
//     console.log(audit)
//     return (
//         <React.Fragment>
//             <Typography variant="h6" gutterBottom>
//                 Payment method
//       </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                     <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <TextField
//                         required
//                         id="cardNumber"
//                         label="Card number"
//                         fullWidth
//                         autoComplete="cc-number"
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <TextField
//                         required
//                         id="cvv"
//                         label="CVV"
//                         helperText="Last three digits on signature strip"
//                         fullWidth
//                         autoComplete="cc-csc"
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <FormControlLabel
//                         control={<Checkbox color="secondary" name="saveCard" value="yes" />}
//                         label="Remember credit card details for next time"
//                     />
//                 </Grid>
//             </Grid>
//         </React.Fragment>
//     );
// }