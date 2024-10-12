import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../assets/auth/AuthProvider";

export default function Validation(){
    const auth = useAuth();

    return auth.isAuth ? <Outlet/> : <Navigate to="/"/>
}