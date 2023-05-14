import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../customHooks/useAuth'

const ProtectedRoute = () => {
    
    const { currentUser } = useAuth(); 

    const navigate = useNavigate()

    console.log('Protected Route =>', !!currentUser);
    console.log('Protected =>', currentUser);
    

    return currentUser !== null ? <Outlet /> : navigate('/login')
}

export default ProtectedRoute
