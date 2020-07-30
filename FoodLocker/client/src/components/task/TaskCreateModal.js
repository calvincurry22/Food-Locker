import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TaskCreateForm from './TaskCreateForm';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { IconButton } from '@material-ui/core';

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

export default ({ toggleTaskModal, taskModal, currentUser, saveTask }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={taskModal}
            >
                <div className={classes.paper}>
                    <IconButton onClick={toggleTaskModal}>
                        <CloseOutlinedIcon />
                    </IconButton>
                    <h2 id="transition-modal-title">New Task</h2>
                    <TaskCreateForm
                        toggleTaskModal={toggleTaskModal}
                        currentUser={currentUser}
                        saveTask={saveTask}
                    />
                </div>
            </Modal>
        </div>
    );
}