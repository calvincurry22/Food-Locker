import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Paper, Typography, Button, FormControlLabel, Checkbox, TableCell, TableRow } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 270,
    },
    buttonColor: {
        backgroundColor: '#32CD32'
    },
    cardSpace: {
        display: "flex",
        height: 200,
        flexDirection: "column",
        position: "relative"
    },
    auditRecordButton: {
        backgroundColor: "rgb(255,99,71)",
        color: "whitesmoke",
    }
}));

export default ({ audit, history }) => {

    const date = new Date(audit.auditDate).toLocaleDateString()
    const classes = useStyles()

    return (
        <>
            {audit &&
                <TableRow>
                    <TableCell>
                        {date}
                    </TableCell>
                    <TableCell>{audit.auditorName}</TableCell>
                    <TableCell>{audit.score}</TableCell>
                    <TableCell>{audit.passed ? "Yes" : "No"}</TableCell>
                    <TableCell className={classes.tableButton}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                history.push(`/audit/${audit.id}`)
                            }}
                        >
                            Details
                        </Button>
                    </TableCell>
                </TableRow>
            }
        </>
    )
}