import React from 'react';
import { Pie, Doughnut } from "react-chartjs-2";
import { Grid } from '@material-ui/core';
import './Audit.css';

export default ({ violations, violationCategories }) => {
    const doughnutChartPercentages = []
    const doughnutChartCategoryNames = []
    const criticals = violations.filter(v => v.isCritical === true)
    const nonCriticals = violations.filter(v => v.isCritical === false)
    const criticalsPercentage = Math.round((criticals.length / violations.length) * 100)
    const nonCriticalsPercentage = Math.round((nonCriticals.length / violations.length) * 100)


    violationCategories.map(vc => {
        const check = violations.filter(v => v.violationCategoryId === vc.id)
        if (check.length === 0) {
            return null
        } else {
            const percentage = Math.round((check.length / violations.length) * 100)
            doughnutChartPercentages.push(percentage)
            doughnutChartCategoryNames.push(vc.name)
        }
    })

    const pieData = {
        labels: ['Critical', 'Non-critical'],
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

    const doughnutData = {
        labels: doughnutChartCategoryNames,
        datasets: [
            {
                label: 'Critical Issues',
                backgroundColor: [
                    '#00A6B4',
                    '#6800B4',
                    '#B21F00',
                    '#08c515',
                    '#2FDE00',
                    '#4c3bc7',
                    '#02421b',
                    '#ae61e7',
                    '#f6f6ae',
                    '#ddd47d',
                    '#659e6c',
                    '#fc437e',
                    '#d8975f',
                    '#d91141',
                    '#b2ea77',
                    '#4e1c0d',
                    '#d79a33',
                    '#c5da3b'
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                ],
                data: doughnutChartPercentages
            }
        ]
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                            position: 'right'
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Doughnut
                    data={doughnutData}
                    options={{
                        title: {
                            display: true,
                            text: '% of Violations by category',
                            fontSize: 16
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </Grid>
        </>
    )
}