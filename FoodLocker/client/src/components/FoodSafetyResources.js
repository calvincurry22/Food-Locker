import React, { useEffect, useContext } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import SideNav from './SideNav';
import { UserContext } from '../providers/UserProvider';



export default () => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { logout, getUserProfile, getAllUserProfiles, updateUser, users, user } = useContext(UserContext)

    useEffect(() => {
        getUserProfile(currentUser.firebaseUserId)
    })
    return (
        <>
            <SideNav user={user} />
            <h1> Food Safety Resources</h1>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Paper>
                        <Typography>
                            FDA
                            https://www.fda.gov/food/food-industry/how-start-food-business
                </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <Typography>
                            UDSA
                </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}