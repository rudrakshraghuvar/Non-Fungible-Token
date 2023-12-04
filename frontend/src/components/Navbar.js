import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        alert("User Logged Out Successfully");
        navigate("/login");
    };
    return (
        <div className="nav">
            <div className="nav-left">
                <Link to="/read">
                    <div className="btn nav-item">Read Contract</div>
                </Link>
                <Link to="/write">
                    <div className="btn nav-item">Write Contract</div>
                </Link>
            </div>
            <div className="nav-right">
                <div className="btn nav-item" onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    );
}

export default Navbar;