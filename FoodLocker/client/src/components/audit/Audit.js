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
        bottom: 10,
        color: "whitesmoke",
        marginLeft: "63%",
        position: "absolute",
    }
}));

export default ({ audit }) => {
    const history = useHistory()
    const date = new Date(audit.auditDate).toLocaleDateString()
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
        <>
            {audit &&
                // <Grid item xs={12} md={4} lg={3}>
                //     <Paper className={fixedHeightPaper} elevation={3} className={classes.cardSpace}>
                //         <Typography variant="h6" align="center" className="auditRecordItem">
                //             Record #{idx + 1}
                //         </Typography>
                //         <br />
                //         <div className="auditRecordInfo">
                //             <Typography className="taskListTyopgraphy">
                //                 Date: {audit.auditDate}
                //             </Typography>
                //             <Typography>
                //                 Score: {audit.score}
                //             </Typography>
                //             <Typography>
                //                 Passed? {audit.passed ? "Yes" : "No"}
                //             </Typography>
                //         </div>
                //         <Button
                //             className={classes.auditRecordButton}
                //             variant="contained"
                //             onClick={() => {
                //                 history.push(`/audit/${audit.id}`)
                //             }}
                //         >
                //             Details
                //         </Button>
                //     </Paper>
                // </Grid>
                <TableRow>
                    <TableCell>
                        {new Date(audit.auditDate).toLocaleDateString()}
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