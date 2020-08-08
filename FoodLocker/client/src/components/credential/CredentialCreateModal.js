import React from 'react';
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CredentialCreateForm from './CredentialCreateForm';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        boxShadow: theme.shadows[5],
    },
}));

export default ({ saveCredential, toggleCredentialModal, credentialModal, currentUser, employeeObj }) => {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={credentialModal}
            >
                <div className={classes.paper}>
                    <IconButton onClick={toggleCredentialModal}>
                        <CloseOutlinedIcon />
                    </IconButton>
                    <h2 id="transition-modal-title">New Credential</h2>
                    <CredentialCreateForm
                        toggleCredentialModal={toggleCredentialModal}
                        saveCredential={saveCredential}
                        employeeObj={employeeObj}
                    />
                </div>
            </Modal>
        </div>
    );
}