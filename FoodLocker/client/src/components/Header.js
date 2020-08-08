import React, { useContext } from 'react';
import { Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
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
    const classes = useStyles()
    const history = useHistory()
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
                            <Tooltip title="Account Settings" arrow>
                                <IconButton
                                    color="inherit"
                                    className="settingsButton"
                                    onClick={() => {
                                        history.push("/accountSettings")
                                    }}
                                >
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