import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { IconButton, Typography, Button } from '@material-ui/core';
import EmployeeCreateForm from './EmployeeCreateForm';

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

export default ({ deleteEmployee, toggleDeleteEmployeeModal, deleteEmployeelModal, employeeToDelete }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={deleteEmployeelModal}
            >
                <div className={classes.paper}>
                    <Typography>
                        Are you sure you want to delete {employeeToDelete.fullName} ?
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={toggleDeleteEmployeeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={e => {
                            e.preventDefault()
                            deleteEmployee(employeeToDelete.id)
                            toggleDeleteEmployeeModal()
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
}