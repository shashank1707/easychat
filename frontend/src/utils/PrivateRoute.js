import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const user = window.localStorage.getItem('chat-app-user');
    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to='/login' replace />
    }
}

export default PrivateRoute
