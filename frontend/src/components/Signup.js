import React from "react";
import { useState } from "react";
import axios from "axios";
import "../styles/UserStyles.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = { name, email, password };
            if (name && email && password) {
                await axios.post(
                    "/users",
                    formdata,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            }
            alert("Registration Successful");
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(`${error.response.data.message}`);
        }
    };
    return (
        <div className="box">
            <div className="signup-form">
                <div className="lright">
                    <h2>ERC 721 DAPP</h2>
                    <Link to="/login">
                        <button type="button" className="reg_btn">
                            Login
                        </button>
                    </Link>
                </div>
                <div className="right">
                    <form className="form_container" onSubmit={handleSubmit}>
                        <h1 className="sph"> Create Account </h1>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            name="name"
                            required
                            onChange={(e) => {
                                setname(e.target.value);
                            }}
                            value={name}
                            className="finput"
                        />
                        <input
                            type="enail"
                            placeholder="Enter your Email"
                            name="email"
                            required
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                            value={email}
                            className="finput"
                        />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            name="password"
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                            className="finput"
                            value={password}
                            required
                        />
                        <button type="submit" className="submit_btn">
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;