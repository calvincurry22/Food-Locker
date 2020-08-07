import React, { useState } from 'react';
import { Container, makeStyles, Grid, TextField, Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default ({ toggleEmployeeEditModal, updateEmployee, employeeObj }) => {
    const [updatedEmployee, setEmployee] = useState(employeeObj)
    const classes = useStyles()

    const editEmployee = () => {
        updateEmployee({
            id: updatedEmployee.id,
            firstName: updatedEmployee.firstName,
            lastName: updatedEmployee.lastName,
            userId: updatedEmployee.userId,
            title: updatedEmployee.title
        })
        toggleEmployeeEditModal()
    }

    const handleControlledInputChange = (event) => {
        const newEmployee = Object.assign({}, updatedEmployee)
        newEmployee[event.target.name] = event.target.value
        setEmployee(newEmployee)
    }

    return (
        <Container component="main" maxWidth="xs">
            <form className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            defaultValue={employeeObj.firstName}
                            fullWidth
                            id="empFirstName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="lname"
                            name="lastName"
                            variant="outlined"
                            required
                            defaultValue={employeeObj.lastName}
                            fullWidth
                            id="empLastName"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleControlledInputChange}
                            autoComplete="title"
                            name="title"
                            variant="outlined"
                            required
                            defaultValue={employeeObj.title}
                            fullWidth
                            id="empTitle"
                        />
                    </Grid>
                </Grid>
            </form>
            <Button
                type="submit"
                variant="contained"
                className={classes.submit}
                onClick={editEmployee}
            >
                Save
            </Button>
        </Container >
    )
}