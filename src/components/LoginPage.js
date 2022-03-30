import { useState, useEffect } from "react";
import { isExpired, Login } from "../methods/Account";
import { useNavigate } from "react-router-dom";
import React from 'react';
import '../UserCreate.css';
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        // isExpired().then(res => {
        //     if (!res) {
        //         navigate("/users")
        //     }
        // })
    }, [])
    const handleLogin = () => {
        Login(username, password)
            .then(res => {
                if (res.status == "200") {
                    console.log(res.data.token)
                    localStorage.setItem("jwt", res.data.token)
                    navigate("/users")
                }
            }).catch(err => {
                console.log(err)
            })

    }
    return (
        <div className="container">
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <div className="row">
                                    <div className="form-group col-md-9">
                                        <h3>LOG IN</h3>
                                        <p>ACCESSING THE USER LIST</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }} className="form-group col-md-3">
                                        <Link to="/" class="btn btn-primary">
                                            Back
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label for="name">Username</label>
                                        <input type="text" className="form-control" id="name" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label for="Surname">Password</label>
                                        <input type="password" className="form-control" id="surname" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}/>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }} class="form-button mt-3">
                                    <button id="submit" type="submit" onClick={() => handleLogin()} class="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;