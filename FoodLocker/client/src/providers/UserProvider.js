import React, { useState, useEffect, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import CircularProgress from '@material-ui/core/CircularProgress';

export const UserContext = createContext();

export function UserProvider(props) {
    const apiUrl = "/api/user";
    const currentUser = sessionStorage.getItem("user");
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(currentUser != null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => sessionStorage.setItem("user", JSON.stringify(userProfile)))
            .then(() => setIsLoggedIn(true))
    };

    const logout = () => {
        return firebase.auth().signOut()
            .then(() => sessionStorage.clear())
            .then(() => setIsLoggedIn(false))
    };

    const register = (user, password) => {
        return firebase.auth().createUserWithEmailAndPassword(user.email, password)
            .then((createResponse) => saveUser({ ...user, firebaseUserId: createResponse.user.uid }))
            .then((savedUser) => sessionStorage.setItem("user", JSON.stringify(savedUser)))
            .then(() => setIsLoggedIn(true))
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`api/user/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()))
    };

    const getAllUserProfiles = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
            .then(setUsers)
    }
    const saveUser = (user) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(resp => resp.json()));
    };

    const updateUser = (user) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${user.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }).then(() => getUserProfile(user.firebaseUserId))
        );

    return (
        <UserContext.Provider value={{ isLoggedIn, user, login, logout, register, getToken, updateUser, getAllUserProfiles, getUserProfile, users }}>
            {isFirebaseReady
                ? props.children
                : <CircularProgress className="app-spinner dark" />}
        </UserContext.Provider>
    );
}