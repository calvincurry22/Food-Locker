import React, { useEffect, useContext } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import { AuditContext } from '../../providers/AuditProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import { Button } from '@material-ui/core';
import SideNav from '../SideNav';
import Audit from './Audit';
import './Audit.css';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        backgroundColor: "#EBECF0",
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        paddingTop: 10,
    },
    tableContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    table: {
        maxWidth: 1175
    },
    newRecordButton: {
        marginLeft: "2%"
    }
}));



export default () => {
    const classes = useStyles()
    const history = useHistory()
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { audits, getAuditsByUserId } = useContext(AuditContext)

    useEffect(() => {
        getAuditsByUserId(currentUser.id);
    }, [])

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <SideNav />
                <main className={classes.content}>
                    <Typography variant="h4" align="center">Audit Records</Typography><br />
                    <Button
                        className={classes.newRecordButton}
                        variant="contained"
                        color="primary"
                        onClick={() => history.push("/createAudit")}
                    >
                        Create new record
                    </Button>
                    <TableContainer className={classes.tableContainer}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Audit Date</strong></TableCell>
                                    <TableCell><strong>Auditor</strong></TableCell>
                                    <TableCell><strong>Score</strong></TableCell>
                                    <TableCell><strong>Passed?</strong></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {audits.map((a) => (
                                    <Audit key={a.id} audit={a} history={history} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </main>
            </div>
        </>
    )
}