import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null); // State to hold user data
  const navigate = useNavigate(); // Hook for navigation

  // useEffect hook to fetch user data from localStorage
  useEffect(() => {
    // Get user data and token from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // If no token or user data is found, redirect to the login page
    if (!token || !storedUser) {
      navigate('/login');
    } else {
      // Set the user data from localStorage
      setUser(storedUser);
    }
  }, [navigate]); // Dependency array to run this effect when navigate changes

  // Handle the logout functionality
  const handleLogout = () => {
    // Remove token and user data from localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page after logout
  };

  // If user data is not loaded yet, show a loading message
  if (!user) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      {/* Profile card */}
      <div className="w-full max-w-lg p-8 bg-gray-400 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-black">User Profile</h1>

        <div className="mt-6 space-y-4">
          {/* Displaying user information */}
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-black">Name:</span>
            <span className="text-lg font-semibold text-black">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-black">Email:</span>
            <span className="text-lg text-black font-semibold">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-black">Phone No:</span>
            <span className="text-lg text-black font-semibold">{user.phoneNo}</span>
          </div>
          
          {/* Displaying the user role (Admin or User) */}
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-black">Role:</span>
            <span className="text-lg font-semibold text-black">
              {user.isAdmin ? 'Admin' : 'User'}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className='p-2 flex justify-evenly bottom-0 bg-gray-400 w-full fixed'>
        {/* Links to navigate to other pages */}
        <Link to='/search'>
          <img src='/src/assets/images/Search.png' alt='Search' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </Link>
        <Link to='/flight'>
          <img src='/src/assets/images/Admin.png' alt='Admin' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </Link>
        <button>
          <img src='/src/assets/images/Profile.png' alt='Profile' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </button>
      </div>
    </div>
  );
}

export default Profile;
