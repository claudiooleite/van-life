import { Outlet, Navigate } from "react-router-dom"

function AuthRequiredLayout() {
    const authenticated = false

    if (!authenticated) {
        return <Navigate to={'./login'} state={{ message: "You must log in first" }} />
    }

    return <Outlet />
}


export default AuthRequiredLayout