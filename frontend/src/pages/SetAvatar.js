import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './auth.css';
import { setAvatarRoute } from "../utils/APIRoutes";
import multiavatar from '@multiavatar/multiavatar/esm'
import './setAvatar.css'

const SetAvatar = () => {


    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 5; i++) {
                let svgCode = multiavatar(`${Math.round(Math.random() * 1000)}`).toString();
                data.push(btoa(svgCode));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem('chat-app-user')
            );
            // console.log(user)
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            // console.log(data)

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    'chat-app-user',
                    JSON.stringify(user)
                );
                window.location.replace('/chat');
            } else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };


    return (
        <>
            <div className="set-avatar-container">
                <div className="title-containter">
                    <h1>Pick an avatar</h1>
                </div>


                <div className="avatars">
                    {avatars.map((avatar, index) => {
                        return (
                            <div className='avatar-box' key={index}>
                                <img
                                    style={{ border: index === selectedAvatar ? '5px solid #F05454' : '5px solid #30475E', borderRadius: '100px', cursor: 'pointer' }}
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                <button onClick={setProfilePicture} className="set-button">
                    Set as Profile Picture
                </button>
            </div>
            <ToastContainer />
        </>
    )
}

export default SetAvatar