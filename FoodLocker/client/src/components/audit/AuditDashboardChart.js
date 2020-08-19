import React from 'react';
import { Line, Bar } from "react-chartjs-2";
import { makeStyles, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chartJsHeight: {
        height: 100
    }
}))

export default ({ audits, barChartView, toggleChartView }) => {

    const classes = useStyles()
    const chartLabels = []
    const chartData = []
    const auditScores = audits.map(a => chartData.push(a.score))

    const test = (obj) => {
        let month;
        let auditDateLocaleString = new Date(obj.auditDate).toLocaleDateString()
        let monthNum = new Date(auditDateLocaleString).getMonth() + 1
        let year = new Date(auditDateLocaleString).getFullYear()

        switch (monthNum) {
            case 1:
                month = `Jan ${year}`;
                chartLabels.push(month)
                break;
            case 2:
                month = `Feb ${year}`;
                chartLabels.push(month)
                break;
            case 3:
                month = `Mar ${year}`;
                chartLabels.push(month)
                break;
            case 4:
                month = `Apr ${year}`;
                chartLabels.push(month)
                break;
            case 5:
                month = `May ${year}`;
                chartLabels.push(month)
                break;
            case 6:
                month = `Jun ${year}`;
                chartLabels.push(month)
                break;
            case 7:
                month = `Jul ${year}`;
                chartLabels.push(month)
                break;
            case 8:
                month = `Aug ${year}`;
                chartLabels.push(month)
                break;
            case 9:
                month = `Sept ${year}`;
                chartLabels.push(month)
                break;
            case 10:
                month = `Oct ${year}`;
                chartLabels.push(month)
                break;
            case 11:
                month = `Nov ${year}`;
                chartLabels.push(month)
                break;
            case 12:
                month = `Dec ${year}`;
                chartLabels.push(month)
                break;
        }
    }

    const auditDates = audits.map(a => {
        return test(a)
    })


    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: "Audit Scores",
                data: chartData,
                fill: true,
                backgroundColor: "RGBA(0,188,228,0.5)",
                borderColor: "rgba(37, 95, 90, 1)"
            }
        ]
    };

    return (
        <>
            <div className="chartHeader">
                <Typography variant="h6" align="left">
                    Audit Records
                </Typography>
                <Button
                    onClick={toggleChartView}
                    className="auditChartButton"
                    variant="outlined"
                >
                    Toggle Chart
                </Button>
            </div>
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
            {/* // :
                // <>
                //     <br />
                //     <Typography variant="h5">No audits to view</Typography>
                // </> */}
        </>
    );
}