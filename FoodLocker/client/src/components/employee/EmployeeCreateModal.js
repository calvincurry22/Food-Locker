import React from 'react';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { makeStyles } from '@material-ui/core/styles';
import EmployeeCreateForm from './EmployeeCreateForm';
import { IconButton } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default ({ saveEmployee, toggleEmployeeModal, employeeModal, currentUser }) => {
    const classes = useStyles();


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={employeeModal}
            >
                <div className={classes.paper}>
                    <IconButton onClick={toggleEmployeeModal}>
                        <CloseOutlinedIcon />
                    </IconButton>
                    <h2 id="transition-modal-title">New Employee</h2>
                    <EmployeeCreateForm
                        toggleEmployeeModal={toggleEmployeeModal}
                        currentUser={currentUser}
                        saveEmployee={saveEmployee}
                    />
                </div>
            </Modal>
        </div>
    );
}