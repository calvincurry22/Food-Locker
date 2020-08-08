import React from 'react';
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CredentialEditForm from './CredentialEditForm';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundColor: theme.palette.background.paper,
    },
}));

export default ({ toggleEditCredentialModal, editCredentialModal, updateCredential, credentialObj }) => {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={editCredentialModal}
            >
                <div className={classes.paper}>
                    <IconButton onClick={toggleEditCredentialModal}>
                        <CloseOutlinedIcon />
                    </IconButton>
                    <h2 id="transition-modal-title">Edit Credential</h2>
                    <CredentialEditForm
                        toggleEditCredentialModal={toggleEditCredentialModal}
                        updateCredential={updateCredential}
                        credentialObj={credentialObj}
                    />
                </div>
            </Modal>
        </div>
    );
}