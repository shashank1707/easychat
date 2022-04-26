import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './auth.css';
import { registerRoute } from "../utils/APIRoutes";
import multiavatar from '@multiavatar/multiavatar/esm'

const Register = () => {

    const navigate = useNavigate();
    const loginState = localStorage.getItem('chat-app-user');

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {username, email, password} = values;
        if(handleValidation()){
            console.log('validation', registerRoute);
            let svgCode = multiavatar(`${Math.round(Math.random() * 1000)}`).toString();
            const {data} = await axios.post(registerRoute, {
                avatarImage: btoa(svgCode),
                username,
                email,
                password
            })
            if(data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                window.location.replace('/set-avatar');
            }
        }   
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const {username, email, password, confirmPassword} = values;

        if(password.length < 6) {
            toast.error('Password should be greater than or equal to 6 charcaters', toastOptions);
            return false;
        }

        if(password !== confirmPassword){
            toast.error('Password does not match!', toastOptions);

            return false;
        }

        if(username.length < 3) {
            toast.error('Username should be greater than 3 charcaters', toastOptions);
            return false;
        }

        return true;
    }

    if(loginState){
        return <Navigate to='/chat' replace={true} />;
    }

    return (
        <>
            <div className="form-container">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <h1 className="logo">EasyChat</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit" className="submit-button">Register</button>
                    <span className="redirect-span">
                        Already have an account ? <Link to="/login" replace={true}>Login.</Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}


export default Register;