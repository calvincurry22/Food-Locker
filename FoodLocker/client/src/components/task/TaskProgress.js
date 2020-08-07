import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';


export default ({ tasks }) => {
    const completedTasks = tasks.filter(t => t.isCompleted === true)
    const taskRatio = (completedTasks.length / tasks.length) * 100

    return (
        <>
            {taskRatio &&
                <CircularProgressbar
                    value={Math.round(taskRatio)}
                    text={`${Math.round(taskRatio)}%`}
                    styles={{
                        // Customize the root svg element
                        root: {},
                        // Customize the path, i.e. the "completed progress"
                        path: {
                            // Path color
                            stroke: `red`,
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'round',
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                            // Trail color
                            stroke: 'rgba(255,99,71, 0.2)',
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'round',
                            // Rotate the trail
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                        },
                        // Customize the text
                        text: {
                            // Text color
                            fill: 'dimgray',
                            // Text size
                            fontSize: '16px',
                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                            fill: '#3e98c7',
                        },
                    }}
                />
            }
        </>
    )
}
