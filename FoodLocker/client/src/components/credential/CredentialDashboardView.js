import React, { useState, useContext, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { CredentialContext } from '../../providers/CredentialProvider';
import { setDate } from 'date-fns';

export default ({ employees }) => {
    const { getCredentialsByEmployeeId } = useContext(CredentialContext)
    let employeesWithNoCredentials = []
    let credentials = []
    const [s, setS] = useState([])


    useEffect(() => {

        employees.map(e => {
            console.log(e)
            getCredentialsByEmployeeId(e.id)
                .then(r => {
                    if (r.length === 0) {
                        credentials.push(e)
                        console.log(credentials)
                    } else {
                        return null
                    }
                });
            // .then(() => {
            //     credentials = credentials.flat()
            //     setS(employeesWithNoCredentials)
            // })
        })
    }, [])

    // if (credentials) {
    //     return null
    // } else {
    //     employeesWithNoCredentials.push(e)
    // }
    // credentials.flat()

    // employees.map(e => {
    //     const t = credentials.find(c => c.employeeId === e.id)
    //     if (t) {
    //         return;
    //     } else {
    //         employeesWithNoCredentials.push(t)
    //     }
    // })

    return (
        <div>
            <Typography>
                Employees without certifications
            </Typography>
            {credentials.length ?
                credentials.map(e => {
                    console.log(e)
                    return <Typography>{e.fullName}</Typography>
                }) : null
            }
        </div>
    )
}