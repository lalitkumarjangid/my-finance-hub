import React, { useState } from 'react';
import "../index.css"
import axios from "axios"
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../hook/useUser';
// import "../../tailwind.config"

export default function SignupPage () {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const user = useUser();

    if (user.loading) {
        return "loading...";
    }

    if (user.user) {
        return <Navigate to="/dashboard" />;
    }
    

    async function registerUser(ev) {
        ev.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName,
                lastName,
                username,
                password
            });
            alert("User Registered!");
            localStorage.setItem("token", response.data.token )
            window.location.replace("/dashboard");
        } catch (err) {
            alert ("Registration Failed!. Please try again later");
        }
        
    }

    return (
        <div className='flex justify-center items-center absolute inset-0 bg-gray-500'>
        <div className='flex flex-col justify-center bg-white shadow-300 h-50 w-80 shadow-white-300 rounded-lg'>
            <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-3xl pt-4'>Sign Up</h1>
            <p className='text-gray-500 px-4 pt-2'>Enter your information to create an</p>
            <p className='text-gray-500 px-4 pb-2'>account</p>
            </div>
            <form action="" onSubmit={registerUser}>
            <div className='flex flex-col'>
            <h4 className='pl-4 pb-2'>First Name</h4>
            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='John' className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4' />
            </div>
            <div className='flex flex-col'>
            <h4 className='pl-4 pb-2'>Last Name</h4>
            <input type="text" name="lastName"  placeholder='Doe' value={lastName} onChange={(e) => setLastName(e.target.value)} className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4' />
            </div>
            <div className='flex flex-col'>
            <h4 className='pl-4 pb-2'>Email</h4>
            <input type="email" name="username" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder='jhondoe@gmail.com' className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4' />
            </div>
            <div className='flex flex-col'>
            <h4 className='pl-4 pb-2'>Password</h4>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='' className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-6' />
            <button className='bg-black text-white h-10 rounded-lg mx-4 mb-4'>Sign Up</button>
            <p className='text-black flex justify-center pb-4'>Already have an account?{" "}<Link className="underline text-bn pl-1" to={"/signin"}>Login</Link></p>
            </div>
            </form>
        </div>
        </div>
    )

};






