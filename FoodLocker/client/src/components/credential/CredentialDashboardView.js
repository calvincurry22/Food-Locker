import React, { useEffect, useContext } from 'react';
import { CredentialContext } from '../../providers/CredentialProvider';
import { EmployeeContext } from '../../providers/EmployeeProvider';
import DashboardEmployee from '../employee/DashboardEmployee';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


const drawerWidth = 270;
//test comment

export default () => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { getEmployeesByUserId, employees } = useContext(EmployeeContext)
    const { getCredentialsByEmployeeId, credentials } = useContext(CredentialContext)

    useEffect(() => {
        getEmployeesByUserId(currentUser.id);
    }, [])

    return (
        <>
            <div >
                <CssBaseline />
                <main >
                    {(employees[0]) ?
                        employees.map(e => (
                            <DashboardEmployee
                                key={e.id}
                                employee={e}
                                credentials={credentials}
                                getCredentialsByEmployeeId={getCredentialsByEmployeeId}
                            />
                        ))
                        :
                        <>
                            <br />
                            <Typography variant="h5">No employees</Typography>
                        </>
                    }
                </main>
            </div>
        </>
    )
}