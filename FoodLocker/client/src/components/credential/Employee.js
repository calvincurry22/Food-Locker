import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox, Tooltip } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CredentialInfo from './CredentialInfo';
import { CredentialContext } from '../../providers/CredentialProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 300,
    },
    buttonColor: {
        backgroundColor: '#32CD32'
    }
}));

export default ({ employee, setEmployeeObj, toggleCredentialModal, setCredentialObj, toggleEditCredentialModal, deleteCredential, getCredentialsByEmployeeId }) => {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const [isChecked, setIsChecked] = useState(false)
    const [credentials, setCredentials] = useState([])
    const { getEmployeesByUserId, getEmployeeById, saveEmployee, updateEmployee, deleteEmployee, employees } = useContext(EmployeeContext)
    // const { getCredentialsByEmployeeId, getCredentialById, saveCredential, updateCredential, deleteCredential } = useContext(CredentialContext)

    // const removeTask = (id) => {
    //     deleteTask(id)
    // }

    // const completeTask = (taskObj) => {
    //     taskObj.isCompleted = true
    //     updateTask(taskObj)
    // }

    useEffect(() => {
        getCredentialsByEmployeeId(employee.id)
            .then(setCredentials)
    })

    return (
        <>
            {employee &&
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={fixedHeightPaper}>
                        <Tooltip title="Add Credential">
                            <Fab
                                onClick={() => {
                                    setEmployeeObj(employee)
                                    toggleCredentialModal()
                                }}
                                aria-label="add" size="small">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        {/* <Typography className="taskListTyopgraphy"> */}
                        <h2>{employee.firstName} {employee.lastName}</h2>
                        <h3>{employee.title}</h3>
                        {/* </Typography> */}
                        <h4>Credentials</h4>
                        {
                            credentials.map(c => {
                                return <CredentialInfo
                                    key={c.id}
                                    credential={c}
                                    employee={employee}
                                    deleteCredential={deleteCredential}
                                    setCredentialObj={setCredentialObj}
                                    toggleEditCredentialModal={toggleEditCredentialModal}
                                />
                            })
                        }
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