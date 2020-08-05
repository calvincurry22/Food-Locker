import React, { useState, useContext, useEffect } from "react";
import { Button, FormGroup, FormLabel, Input, CircularProgress, LinearProgress } from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserContext } from "../../providers/UserProvider";
import AccountImageUpload from "./AccountImageUpload";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.main,
        backgroundColor: "#32CD32"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default () => {
    const history = useHistory();
    const classes = useStyles();
    const currentUser = JSON.parse(sessionStorage.getItem("user"))
    const { updateUser, getAllUserProfiles, users, getUserProfile } = useContext(UserContext)
    const [user, setUser] = useState({})
    const [updatedUser, setUpdatedUser] = useState({});
    const [imageUrl, setImageUrl] = useState('')

    const editUser = (e) => {
        e.preventDefault();
        console.log(updatedUser)
        if (imageUrl !== '') {
            updateUser({
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                password: updatedUser.password,
                businessName: updatedUser.businessName,
                firebaseUserId: updatedUser.firebaseUserId,
                image: imageUrl
            })
        } else {
            updateUser(updatedUser)
        }
        alert("Account successfully updated!");
        history.replace("/")
    }

    const existingEmailCheck = (e) => {
        e.preventDefault()
        console.log(user)
        if (users.length) {
            const foundUser = users.find(u => u.email === updatedUser.email)
            if (foundUser && foundUser.id !== updatedUser.id) {
                alert("Error: Email already exists")
            } else {
                editUser(e)
            }
        }
    }

    const handleControlledInputChange = (event) => {
        console.log(event.target.value)
        console.log(updatedUser)
        const newUser = Object.assign({}, updatedUser);
        newUser[event.target.name] = event.target.value;
        setUpdatedUser(newUser);
    };

    useEffect(() => {
        getAllUserProfiles();
        getUserProfile(currentUser.firebaseUserId)
            .then(res => {
                setUpdatedUser(res)
                setUser(res)
            });
        // setUpdatedUser(user)
    }, [])


    return (
        <>
            <Link to="/">Back to dashboard</Link>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {user.hasOwnProperty('firstName') ?
                        <>
                            <form className={classes.form} onSubmit={existingEmailCheck}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            onChange={handleControlledInputChange}
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            defaultValue={user.firstName}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            onChange={handleControlledInputChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            defaultValue={user.lastName}
                                            autoComplete="lname"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={handleControlledInputChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            defaultValue={user.email}
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={handleControlledInputChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            defaultValue={user.password}
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={handleControlledInputChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="businessName"
                                            label="Business Name"
                                            type="businessName"
                                            id="businessName"
                                            defaultValue={user.businessName}
                                            autoComplete="current-businessName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AccountImageUpload setImageUrl={setImageUrl} />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </>
                        : <CircularProgress />
                    }
                </div>
            </Container>
        </>
    );
}