import React from 'react';
import TaskEditForm from './TaskEditForm';
import Modal from '@material-ui/core/Modal';
import { IconButton } from '@material-ui/core';
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