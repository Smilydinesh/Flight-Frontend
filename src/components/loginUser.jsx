import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import necessary hooks for routing
import axios from 'axios'; // Import axios for HTTP requests

export default function Login() {
  // useState hooks to manage email and password form inputs
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const navigate = useNavigate(); // Hook to navigate after successful login

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare login data
    const data = {
      email,
      password,
    };

    // Send POST request to login API endpoint
    axios.post('https://flight-backend-nqc8.onrender.com/user/login', data)
      .then((res) => {
        if (res.data.status === 'ok') {
          // On successful login, store token and user info in localStorage
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user data

          // Check if the user is an admin and set in localStorage
          localStorage.setItem('isAdmin', res.data.user.isAdmin);

          alert('Login Successful');
          // Navigate to the search page after successful login
          navigate('/search');
        } else {
          alert(res.data.message || 'Something went wrong'); // Show error if login fails
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Something went wrong'); // Show general error message
      });
  };

  return (
    <div className="grid place-items-center h-screen bg-[url('/src/assets/images/Flight.jpg')] bg-cover bg-center">
      {/* Main container with background image and centered form */}
      <div className="flex justify-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-auto border-2 border-gray-600 rounded-xl bg-gray-400">
        <form onSubmit={handleSubmit}>
          {/* Form title */}
          <h2 className="text-center font-bold p-4">Login Page</h2>

          {/* Email input */}
          <div className="p-2 pl-4">
            <input
              type="email"
              placeholder="Email"
              className="border-2 w-full sm:w-96 h-12 rounded-full text-center hover:border-yellow-300 outline-green-400"
              onChange={(e) => setEmail(e.target.value)} // Update email on change
            />
          </div>

          {/* Password input */}
          <div className="p-2 pl-4">
            <input
              type="password"
              placeholder="Password"
              className="border-2 w-full sm:w-96 h-12 rounded-full text-center hover:border-yellow-300 outline-green-400"
              onChange={(e) => setPassword(e.target.value)} // Update password on change
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pr-5">
            <Link to="/forgot-password" className="text-blue-500 hover:underline font-semibold">
              Forgot Password?
            </Link>
          </div>

          {/* Submit button */}
          <div className="p-4">
            <button
              type="submit"
              className="w-full md:w-96 h-12 rounded-full bg-green-400 font-bold text-pink-500 p-2 hover:bg-green-500"
            >
              LOGIN
            </button>
          </div>

          {/* Register link */}
          <p className="text-center font-semibold p-2">
            Don't have an account?
            <Link to="/register" className="text-blue-500 hover:underline p-2">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
