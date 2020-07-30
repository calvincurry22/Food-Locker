import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { EmployeeContext } from '../providers/EmployeeProvider';
import { CredentialContext } from '../providers/CredentialProvider';
import CredentialInfo from './credential/CredentialInfo';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 400,
    },
    buttonColor: {
        backgroundColor: '#32CD32'
    }
}));

export default ({ employee }) => {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const [isChecked, setIsChecked] = useState(false)
    const { getEmployeesByUserId, getEmployeeById, saveEmployee, updateEmployee, deleteEmployee, employees } = useContext(EmployeeContext)
    const { getCredentialsByEmployeeId, getCredentialById, saveCredential, updateCredential, deleteCredential, credentials } = useContext(CredentialContext)

    // const removeTask = (id) => {
    //     deleteTask(id)
    // }

    // const completeTask = (taskObj) => {
    //     taskObj.isCompleted = true
    //     updateTask(taskObj)
    // }

    useEffect(() => {
        getCredentialsByEmployeeId(employee.id)
    })

    return (
        <>
            {employee &&
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={fixedHeightPaper}>
                        <Typography className="taskListTyopgraphy">
                            <h2>{employee.firstName} {employee.lastName}</h2>
                            <h3>{employee.title}</h3>
                        </Typography>
                        <Typography>
                            <h4>Credentials</h4>
                        </Typography>
                        <Typography>
                            {
                                credentials.map(c => {
                                    return <CredentialInfo credential={c} />
                                })
                            }
                        </Typography>
                        <Button variant="contained">
                            Edit Employee
                        </Button>
                        <Button variant="contained">
                            Delete Employee
                        </Button>
                    </Paper>
                </Grid>
            }
        </>
    )
}