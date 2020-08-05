// import React from 'react';
// import { AppBar, Toolbar, IconButton, Badge, Grid, Typography } from '@material-ui/core';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import SettingsIcon from '@material-ui/icons/Settings';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import "./Dashboard.css";

// export default () => {
//     return (
//         <Grid container>
//             <AppBar className="appBar">
//                 <Toolbar className="toolBar">
//                     <Grid item xs>
//                         <Typography component="h1" variant="h6" color="inherit" className="header">
//                             FoodLocker
//                     </Typography>
//                     </Grid>
//                     <Grid item xs={9} className="headerIconGrid">
//                         <IconButton color="inherit" className="notificationsBadge">
//                             <Badge badgeContent={4} color="secondary" >
//                                 <NotificationsIcon />
//                             </Badge>
//                         </IconButton>
//                         <IconButton color="inherit" className="settingsButton" >
//                             <SettingsIcon />
//                         </IconButton>
//                     </Grid>
//                 </Toolbar>
//             </AppBar>
//         </Grid>
//     )
// }
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import { Badge, Tooltip } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const history = useHistory()
    const classes = useStyles();
    const { isLoggedIn } = useContext(UserContext)

    return (
        <div className={classes.root}>
            <AppBar position="static" className="appBar">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        FoodLocker
                    </Typography>
                    {isLoggedIn &&
                        <>
                            {/* <Tooltip title="Notifications" arrow>
                                <IconButton color="inherit" className="notificationsBadge">
                                    <Badge badgeContent={4} color="secondary" >
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip> */}
                            <Tooltip title="Account Settings" arrow>
                                <IconButton color="inherit" className="settingsButton" onClick={() => history.push("/accountSettings")}>
                                    <SettingsIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

//test comment to check git repo    