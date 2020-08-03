import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default ({ tasks }) => {
    const completedTasks = tasks.filter(t => t.isCompleted === true)
    const taskRatio = (completedTasks.length / tasks.length) * 100
    return <CircularProgressbar value={Math.round(taskRatio)} text={`${Math.round(taskRatio)}%`} />
}
