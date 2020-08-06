import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox, Tooltip, List, ListItemText, ListItem, Divider, ListItemAvatar, Avatar } from '@material-ui/core';
import { green, yellow } from '@material-ui/core/colors';
import CredentialInfo from '../credential/CredentialInfo';
import { CredentialContext } from '../../providers/CredentialProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import './Employee.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    gold: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
    }
}));

export default ({ employee, setEmployeeObj, arrayOfEmployeesWithoutCredentials, toggleCredentialModal, setCredentialObj, toggleEditCredentialModal, deleteCredential, getCredentialsByEmployeeId, toggleEmployeeEditModal, toggleDeleteEmployeeModal, setEmployeeToDelete }) => {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
    const [isChecked, setIsChecked] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [credentials, setCredentials] = useState([])
    const [expiredCredentials, setExpiredCredentials] = useState([])
    const { getEmployeesByUserId, getEmployeeById, saveEmployee, updateEmployee, deleteEmployee, employees } = useContext(EmployeeContext)

    const today = new Date();
    const expiredList = credentials.filter(c => new Date(c.expirationDate) < today)

    useEffect(() => {
        getCredentialsByEmployeeId(employee.id)
            .then(setCredentials)
    }, [])

    return (
        <>
            {credentials &&
                <>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={classes.gold}>
                                <FaceOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={employee.fullName}
                            secondary={`${credentials.length} credential(s), ${expiredList.length} expired`} />
                    </ListItem>
                    <Divider />
                </>
            }
        </>
    )
}