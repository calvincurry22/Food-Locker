import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Button, CircularProgress } from '@material-ui/core';
import { TaskContext } from '../../providers/TaskProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TaskCreateModal from './TaskCreateModal';
import CompletedTask from './CompletedTask';
import TaskEditModal from './TaskEditModal';
import SideNav from '../SideNav';
import Task from './Task';
import "./Task.css";

const drawerWidth = 270;
//test comment

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        backgroundColor: "#EBECF0",
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

export default () => {
    const classes = useStyles()
    const [taskObj, setTaskObj] = useState({})
    const [loading, setLoading] = useState(true)
    const [taskModal, setTaskModal] = useState(false)
    const toggleTaskModal = () => setTaskModal(!taskModal)
    const [viewingNewTasks, setViewingNewTasks] = useState(true)
    const toggleView = () => setViewingNewTasks(!viewingNewTasks)
    const [editTaskModal, setEditTaskModal] = useState(false)
    const toggleEditTaskModal = () => setEditTaskModal(!editTaskModal)
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const [viewButton, setViewButton] = useState("View Completed Tasks")
    const {
        getIncompleteTasksByUserId,
        getCompletedTasksByUserId,
        tasks,
        deleteTask,
        updateTask,
        saveTask,
        deleteCompletedTask,
        completedTasks
    } = useContext(TaskContext)


    useEffect(() => {
        async function fetchData() {
            if (viewingNewTasks) {
                setViewButton("View Completed Tasks");
                await getIncompleteTasksByUserId(currentUser.id);
            } else {
                setViewButton("View Current Tasks");
                await getCompletedTasksByUserId(currentUser.id);
            }
            setLoading(false)
        }
        fetchData();
    }, [viewingNewTasks])

    return (
        <>
            {loading ?
                <CircularProgress />
                :
                <div className={classes.root}>
                    <CssBaseline />
                    <SideNav />
                    <main className={classes.content}>
                        <br />
                        <Typography variant="h4" align="center">
                            Manage Tasks
                    </Typography>
                        <Button
                            variant="contained"
                            className="listToggleButton"
                            onClick={toggleView}
                        >
                            {viewButton}
                        </Button>
                        <Button
                            onClick={toggleTaskModal}
                            color="primary"
                            variant="contained"
                        >
                            Add new task
                    </Button>
                        <Container maxWidth="lg" className={classes.container}>
                            <Grid container spacing={4}>
                                {
                                    (viewingNewTasks) ?
                                        tasks.map(t => (
                                            <Task
                                                key={t.id}
                                                task={t}
                                                setTaskObj={setTaskObj}
                                                updateTask={updateTask}
                                                deleteTask={deleteTask}
                                                toggleEditTaskModal={toggleEditTaskModal}
                                            />
                                        ))
                                        : completedTasks.map(t => (
                                            <CompletedTask
                                                task={t}
                                                key={t.id}
                                                currentUser={currentUser}
                                                deleteCompletedTask={deleteCompletedTask}
                                            />
                                        ))
                                }
                            </Grid>
                        </Container>
                        <TaskCreateModal
                            currentUser={currentUser}
                            toggleTaskModal={toggleTaskModal}
                            taskModal={taskModal}
                            saveTask={saveTask}
                        />
                        <TaskEditModal
                            toggleEditTaskModal={toggleEditTaskModal}
                            currentUser={currentUser}
                            editTaskModal={editTaskModal}
                            updateTask={updateTask}
                            taskObj={taskObj}
                        />
                    </main>
                </div>
            }
        </>
    )
}