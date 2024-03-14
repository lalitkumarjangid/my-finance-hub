import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SendMoney from './sendMoney';
import { useUser } from '../hook/useUser';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState("");
  const user = useUser();
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://my-finance-hub-ten.vercel.app//api/v1/user/bulk?filter=${filter}`);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="p-4 bg-transparent">
        {/* Header */}
        <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
  <h1 hidden={hidden} className="font-bold text-3xl py-5 pl-5">
    <span style={{ background: 'linear-gradient(to right, magenta, gray)', WebkitBackgroundClip: 'text', color: 'transparent' }}>My Finance Hub</span>
  </h1>
</div>
          <div className="flex items-center justify-end flex-grow">
            <button
              className="rounded-full h-10 w-10 my-5 ml-5 mr-4 bg-gray-700"
              onClick={toggleUserDetails}
            >
              {user.userDetails ? user.userDetails.firstName[0].toUpperCase() : 'U'}
            </button>
          </div>
        </div>
{/* User Details */}
{showUserDetails && (
  <div className="p-4 border bg-gray-900 absolute top-16 right-5 rounded-md shadow-md">
    <p className="text-sm text-gray-300">
      <span className="font-bold">Name:</span> {user.userDetails ? `${user.userDetails.firstName} ${user.userDetails.lastName || ''}` : 'Loading...'}
    </p>
    <p className="text-sm text-gray-300">
      <span className="font-bold">E-mail:</span> {user.userDetails ? `${`Yaad Kr`}   ` : 'Loading...'}
    </p>
    <p className="text-sm text-gray-300">
      <span className="font-bold">Balance:</span> {user.userDetails ? user.userDetails.balance : 'Loading...'}
    </p>
  </div>
)}

        {/* Balance */}
        <div hidden={hidden} className="border-t border-gray-700"></div>
        <p hidden={hidden} className="font-bold text-2xl py-5 pl-5">Your Balance: {user.userDetails ? user.userDetails.balance : 'Loading...'}</p>
        <p hidden={hidden} className="font-bold text-2xl pb-5 pl-5">Users </p>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            hidden={hidden}
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            placeholder="Search User"
            className="border-2 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 w-full focus:outline-none focus:border-green-500 text-gray-500"
          />
          <div className="absolute top-0 right-0 mt-3 mr-4">
            <svg className="text-gray-500 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m-3 0a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z" />
            </svg>
          </div>
        </div>

        {/* User List */}
        {data.map(item => (
          <div key={item._id} hidden={hidden} className="flex justify-between items-center">
            <button hidden={hidden} className="rounded-full h-10 w-10 my-5 ml-5 mr-4 bg-gray-700">{item.firstName[0].toUpperCase()}</button>
            <div>
              <p hidden={hidden} className="font-bold text-xl py-5 pl-1">{`${item.firstName} ${item.lastName || ''}`}</p>
            </div>
            <div className="flex items-center justify-end flex-grow">
              <button hidden={hidden} className="rounded-lg bg-green-500 text-white w-30 h-10 px-4 mr-4" onClick={() => sendMoney(item._id)}>Send Money</button>
            </div>
          </div>
        ))}

        {/* Send Money Component */}
        {selectedUser && <SendMoney name={selectedUser} token={localStorage.getItem('token')} />}
      </div>
    </div>
  );
}
