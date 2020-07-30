import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TaskCreateForm from './TaskCreateForm';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { IconButton } from '@material-ui/core';
import TaskEditForm from './TaskEditForm';

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

export default ({ toggleEditTaskModal, editTaskModal, currentUser, updateTask, taskObj }) => {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={editTaskModal}
            >
                <div className={classes.paper}>
                    <IconButton onClick={toggleEditTaskModal}>
                        <CloseOutlinedIcon />
                    </IconButton>
                    <h2 id="transition-modal-title">Edit Task</h2>
                    <TaskEditForm
                        toggleEditTaskModal={toggleEditTaskModal}
                        currentUser={currentUser}
                        updateTask={updateTask}
                        taskObj={taskObj}
                    />
                </div>
            </Modal>
        </div>
    );
}