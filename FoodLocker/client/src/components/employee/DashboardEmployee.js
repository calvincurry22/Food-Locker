import React, { useState, useEffect } from 'react';
import { ListItemText, ListItem, Divider, ListItemAvatar, Avatar } from '@material-ui/core';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
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



export default ({ employee, getCredentialsByEmployeeId }) => {
    const today = new Date();
    const classes = useStyles()
    const [credentials, setCredentials] = useState([])
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
                            secondary={`${credentials.length} credential(s), ${expiredList.length} expired`}
                        />
                    </ListItem>
                    <Divider />
                </>
            }
        </>
    )
}