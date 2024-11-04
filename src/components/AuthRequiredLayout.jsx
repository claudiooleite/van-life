import { Outlet, Navigate, useLocation } from "react-router-dom"

function AuthRequiredLayout() {
    const isLoggedIn = localStorage.getItem("loggedin")
    const location = useLocation()
    console.log(location)

    if (!isLoggedIn) {
        return (
            <Navigate
                to="/login"
                state={{
                    message: "You must log in first",
                    from: location.pathname
                }}
                replace
            />)
    }
    return <Outlet />
}


export default AuthRequiredLayout

