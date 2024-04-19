import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoutes({ children }) {




    let token = localStorage.getItem("token")

    try {
        const decoded = jwtDecode(token);
    } catch (error) {

        console.log(error);
        localStorage.clear()
        return <Navigate to="/signin" />
    }


    if (token)
        return children

    return <Navigate to="/signin" />
}