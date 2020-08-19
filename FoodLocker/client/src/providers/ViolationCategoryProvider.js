import React, { useState, createContext, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from './UserProvider';

export const ViolationCategoryContext = createContext();

export default (props) => {
    const apiUrl = "/api/violationCategory"
    const [violationCategories, setViolationCategories] = useState([])
    const { getToken } = useContext(UserContext)

    const getAllViolationCategories = async () => {
        await getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setViolationCategories)
        )
    };
    const getViolationCategoryById = async (id) => {
        await getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        )
    };

    return (
        <ViolationCategoryContext.Provider
            value={{
                violationCategories,
                getAllViolationCategories,
                getViolationCategoryById
            }}
        >
            {props.children}
        </ViolationCategoryContext.Provider>
    );
}