import React, { useState, useEffect, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import CircularProgress from '@material-ui/core/CircularProgress';

export const UserContext = createContext();

export function UserProvider(props) {
    const apiUrl = "/api/user";
    const user = sessionStorage.getItem("user");
    const [isLoggedIn, setIsLoggedIn] = useState(user != null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {

        return firebase.auth().signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((user) => sessionStorage.setItem("user", JSON.stringify(user)))
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
            .then((savedUser) => sessionStorage.setItem("user", JSON.stringify(savedUser)));
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`api/user/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

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

    return (
        <UserContext.Provider value={{ isLoggedIn, login, logout, register, getToken }}>
            {isFirebaseReady
                ? props.children
                : <CircularProgress className="app-spinner dark" />}
        </UserContext.Provider>
    );
}