import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SendMoney from './sendMoney';
import { useUser } from '../hook/useUser';

// Replace 'your-logo-url' with the actual URL of your logo
const YourLogoURL = 'https://ibb.co/ccSHFsG';

export default function MyFinanceHub() {
    const [data, setData] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filter, setFilter] = useState("");
    const user = useUser();
    const [showUserDetails, setShowUserDetails] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter);
                setData(response.data.user);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [filter]);

    function sendMoney(id) {
        setHidden(true);
        const user_data = data.find(user => user._id === id);
        setSelectedUser(user_data);
    }

    function toggleUserDetails() {
        setShowUserDetails(!showUserDetails);
    }

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen text-white font-sans">
            <div className="container mx-auto p-8">
                <div className='flex justify-between items-center mb-8'>
                    {/* Replace Payments App with your new name and add your logo */}
                    <div className="flex items-center space-x-4">
                       
                        <h1 hidden={hidden} className='text-3xl font-bold'>My Finance Hub</h1>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <button
                            className='rounded-full bg-gray-700 h-10 w-10'
                            onClick={toggleUserDetails}
                        >
                            {user.userDetails ? user.userDetails.firstName[0].toUpperCase() : 'U'}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6 relative">
                    <input
                        onChange={(e) => setFilter(e.target.value)}
                        type="text"
                        placeholder='Search User'
                        className='border-2 border-gray-700 rounded-lg h-12 pl-4 pr-12 w-full bg-transparent text-white focus:outline-none focus:border-green-500'
                    />
                    <div className="absolute top-0 right-0 mt-3 mr-4">
                        <svg className="text-gray-500 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m-3 0a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z"/>
                        </svg>
                    </div>
                </div>

                {showUserDetails && (
                    <div className="p-4 border bg-gray-900 absolute top-16 right-5 rounded-md shadow-md">
                        <p className='text-gray-300 text-sm'>
                            <span className='font-bold'>Name:</span> {user.userDetails ? `${user.userDetails.firstName} ${user.userDetails.lastName || ''}` : 'Loading...'}
                        </p>
                        <p className='text-gray-300 text-sm'>
                            <span className='font-bold'>Balance:</span> {user.userDetails ? user.userDetails.balance : 'Loading...'}
                        </p>
                    </div>
                )}

                <div className="border-t border-gray-700 mb-6"></div>

                <p hidden={hidden} className='text-2xl font-bold mb-6'>Your Balance: {user.userDetails ? user.userDetails.balance : 'Loading...'}</p>
                <p hidden={hidden} className='text-2xl font-bold mb-6'>Users </p>

                {data.map(item => (
                    <div key={item._id} hidden={hidden} className='flex justify-between items-center mb-4'>
                        <button hidden={hidden} className='rounded-full bg-gray-700 h-12 w-12'>{`${item.firstName[0].toUpperCase()}${item.lastName ? item.lastName[0].toUpperCase() : ''}`}</button>
                        <div>
                            <p hidden={hidden} className='font-bold text-xl'>{`${item.firstName} ${item.lastName || ''}`}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button hidden={hidden} className='rounded-lg bg-green-500 text-white h-12 px-6' onClick={() => sendMoney(item._id)}>Send Money</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
