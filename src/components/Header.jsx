import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import menu and close icons
import imageUrl from "../assets/images/avatar-icon.png";

function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    };

    function fakeLogOut() {
        localStorage.removeItem("loggedin");
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>

            {/* Menu icon for toggling */}
            <button className="menu-icon" onClick={() => setShowMenu(prev => !prev)}>
                {showMenu ? <FaTimes /> : <FaBars />} {/* Toggle between icons */}
            </button>

            {/* Conditional rendering of the nav menu */}
            <nav className={`nav-links ${showMenu ? "show" : ""}`}>
                <NavLink to="/host" style={({ isActive }) => isActive ? activeStyles : null}>
                    Host
                </NavLink>
                <NavLink to="/about" style={({ isActive }) => isActive ? activeStyles : null}>
                    About
                </NavLink>
                <NavLink to="/vans" style={({ isActive }) => isActive ? activeStyles : null}>
                    Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img src={imageUrl} className="login-icon" />
                </Link>
                <button onClick={fakeLogOut}>Log out (testing)</button>
            </nav>
        </header>
    );
}

export default Header;
