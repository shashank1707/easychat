import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './auth.css';
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {

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
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {username, password} = values;
        if(handleValidation()){
            // console.log('validation', registerRoute);
            const {data} = await axios.post(loginRoute, {
                username,
                password
            })
            if(data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate('/chat');
            }
        }   
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const {username, password} = values;

        if(username === "") {
            toast.error('Username is required', toastOptions);
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
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                   
                    <button type="submit" className="submit-button">Login</button>
                    <span className="redirect-span">
                        Don't have an account ? <Link to="/register" replace={true}>Register</Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}


export default Login;