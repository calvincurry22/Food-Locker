import React from 'react';
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

export default ({ violations }) => {
    const criticals = violations.filter(v => v.isCritical === true)
    const nonCriticals = violations.filter(v => v.isCritical === false)
    const criticalsPercentage = Math.round((criticals.length / violations.length) * 100)
    const nonCriticalsPercentage = Math.round((nonCriticals.length / violations.length) * 100)
    console.log(criticalsPercentage)
    console.log(nonCriticalsPercentage)
    const pieData = {
        labels: ['Cricical', 'Non-critical'],
        datasets: [
            {
                label: 'Critical Issues',
                backgroundColor: [
                    '#B21F00',
                    '#08c515',
                    '#2FDE00',
                    '#00A6B4',
                    '#6800B4'
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                ],
                data: [criticalsPercentage, nonCriticalsPercentage]
            }
        ]
    }

    return (
        <Pie
            data={pieData}
            options={{
                title: {
                    display: true,
                    text: '% of Critical Violations',
                    fontSize: 16
                },
                legend: {
                    display: true,
                    position: 'left'
                }
            }}
        />
    )
}