import React, { useContext, useEffect, useState } from 'react';
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { AuditContext } from '../providers/AuditProvider';
import { AuditViolationContext } from '../providers/AuditViolationProvider';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    chartJsHeight: {
        height: 100
    },
}))

export default ({ audits, barChartView }) => {
    // const currentUser = JSON.parse(sessionStorage.getItem("user"))
    // const { audits, getAuditsByUserId, getAuditById, saveAudit, updateAudit, deleteAudit } = useContext(AuditContext)
    // const [getViolationsByAuditId, auditViolations] = useContext(AuditViolationContext)

    // useEffect(() => {
    //     getAuditsByUserId(currentUser.id);
    //     getViolationsByAuditId(3);


    // })
    const classes = useStyles()
    const d = []

    const test = (obj, month) => {

        let z = new Date(obj.auditDate).toLocaleDateString()
        let monthNum = new Date(z).getMonth() + 1
        let year = new Date(z).getFullYear()
        console.log(monthNum)

        switch (monthNum) {
            case 1:
                month = `Jan ${year}`;
                d.push(month)
                break;
            case 2:
                month = `Feb ${year}`;
                d.push(month)
                break;
            case 3:
                month = `Mar ${year}`;
                d.push(month)
                break;
            case 4:
                month = `Apr ${year}`;
                d.push(month)
                break;
            case 5:
                month = `May ${year}`;
                d.push(month)
                break;
            case 6:
                month = `Jun ${year}`;
                d.push(month)
                break;
            case 7:
                month = `Jul ${year}`;
                d.push(month)
                break;
            case 8:
                month = `Aug ${year}`;
                d.push(month)
                break;
            case 9:
                month = `Sept ${year}`;
                d.push(month)
                break;
            case 10:
                month = `Oct ${year}`;
                d.push(month)
                break;
            case 11:
                month = `Nov ${year}`;
                d.push(month)
                break;
            case 12:
                month = `Dec ${year}`;
                d.push(month)
                break;
        }
    }
    const c = []
    const auditScores = audits.map(a => c.push(a.score))
    const auditDates = audits.map(a => {
        const m = 'a'
        test(a, m)
    })


    const data = {
        // labels: ['Jan', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: d,
        datasets: [
            {
                label: "Audit Scores",
                data: c,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(37, 95, 90, 1)"
            }
            // },
            // {
            //     label: "Second dataset",
            //     data: [33, 25, 35, 51, 54, 76],
            //     fill: false,
            //     borderColor: "#742774"
            // }
        ]
    };

    const barData = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }

    const pieData = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#B21F00',
                    '#C9DE00',
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
                data: ['handwashing', 'sanitation']
            }
        ]
    }

    return (
        <>
            {!barChartView &&

                <div className="App">
                    <Line data={data} options={{
                        scales: {
                            yAxes: [{
                                display: true,
                                ticks: {
                                    stepSize: 5,
                                    maxTicksLimit: 10,    // minimum will be 0, unless there is a lower value.
                                    // OR //
                                    beginAtZero: true   // minimum value will be 0.
                                }
                            }]
                        }
                    }} />
                </div>
            }
            {barChartView &&

                <div className={classes.chartJsHeight}>
                    <Bar

                        data={data}
                        options={{
                            responsive: true,
                            scales: {
                                yAxes: [{
                                    display: true,
                                    ticks: {
                                        stepSize: 5,
                                        maxTicksLimit: 8,    // minimum will be 0, unless there is a lower value.
                                        // OR //
                                        beginAtZero: true   // minimum value will be 0.
                                    }
                                }]
                            }
                        }}
                    />
                </div>
            }
        </>
    );
}