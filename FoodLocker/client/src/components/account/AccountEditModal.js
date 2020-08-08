import React from 'react';
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
import AccountEditForm from './AccountEditForm';
import { makeStyles } from '@material-ui/core/styles';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default ({ user, users, updateUser, accountEditModal, toggleAccountEditModal }) => {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={accountEditModal}
            >
                <div className={classes.paper}>
                    <IconButton onClick={toggleAccountEditModal}>
                        <CloseOutlinedIcon />
                    </IconButton>
                    <h2 id="transition-modal-title">Account Settings</h2>
                    <AccountEditForm
                        toggleAccountEditModal={toggleAccountEditModal}
                        user={user}
                        users={users}
                        updateUser={updateUser}
                    />
                </div>
            </Modal>
        </div>
    );
}