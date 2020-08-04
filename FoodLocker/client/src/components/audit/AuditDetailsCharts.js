import React, { useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

export default ({ violations, violationCategories }) => {
    const criticals = violations.filter(v => v.isCritical === true)
    const nonCriticals = violations.filter(v => v.isCritical === false)
    const criticalsPercentage = Math.round((criticals.length / violations.length) * 100)
    const nonCriticalsPercentage = Math.round((nonCriticals.length / violations.length) * 100)
    const d = []
    const e = []
    // const handleCategoryMatch = (categoryObj) => {
    //     if (d.length === 0) {
    //         d.push(categoryObj)
    //     } else {
    //         const check = d.find(obj => obj.id === categoryObj.id)
    //         if (check) {
    //             return null
    //         } else {
    //             d.push(categoryObj)
    //         }
    //     }
    // }

    // const findCategoryPercentages = () => {
    //     d.map(obj => {
    //         console.log(d)
    //         const categoryViolationArray = violations.filter(v => v.violationCategoryId === obj.id)
    //         const percentage = Math.round((categoryViolationArray.length / violations.length) * 100)
    //         e.push(percentage)
    //     })
    // }

    // const grabRelevantViolationCategories = () => {
    //     violations.map(v => {
    //         const foundCategory = violationCategories.find(c => c.id === v.violationCategoryId)
    //         handleCategoryMatch(foundCategory)
    //     })
    //     findCategoryPercentages()
    // }

    // grabRelevantViolationCategories();


    violationCategories.map(vc => {
        const check = violations.filter(v => v.violationCategoryId === vc.id)
        if (check.length === 0) {
            return null
        } else {
            const percentage = Math.round((check.length / violations.length) * 100)
            e.push(percentage)
            d.push(vc.name)
        }
    })
    /*
    map violations
    then each violation will map categories
    push matching category names onto new array, based on violationCategoryId
    while checking that if the category is already on the array, it will not push it
    new category array will be the labels part of the data object
    map violations and then 
    */


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
        labels: d,
        datasets: [
            {
                label: 'Critical Issues',
                backgroundColor: [
                    // '#B21F00',
                    // '#08c515',
                    // '#2FDE00',
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
                data: e
            }
        ]
    }

    return (
        <>
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
        </>
    )
}