import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  // State hooks for capturing form data
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // New state to handle the admin role
  const navigate = useNavigate(); // For navigation after successful registration

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Prepare data to be sent to the backend
    const data = {
      name,
      phoneNo,
      email,
      password,
      isAdmin, // Send the admin role status as well
    };

    // Send a POST request to the backend API for user registration
    axios.post('https://flight-backend-nqc8.onrender.com/user/register', data)
      .then((res) => {
        // Handle success response
        if (res.data.status === 'ok') {
          alert('Registration Successful');
          navigate('/'); // Redirect to login page on success
        } else {
          // If there's an issue, display the error message
          alert(res.data.message || 'Something went wrong');
        }
      })
      .catch((err) => {
        // Catch any errors from the request
        console.error('Error:', err);
        alert('Something went wrong');
      });
  };

  return (
    <div className="grid place-items-center h-screen bg-[url('../assets/images/Flight.jpg')] bg-cover bg-center">
      <div className='flex justify-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-auto border-2 border-gray-600 rounded-xl bg-gray-400'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-center font-bold p-4'>Register Page</h2>
          
          {/* Name Field */}
          <div className="p-2 pl-4">
            <input
              type="text"
              placeholder="Name"
              className='border-2 w-full sm:w-96 h-12 rounded-full text-center hover:border-yellow-300 outline-green-400'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Phone Number Field */}
          <div className="p-2 pl-4">
            <input
              type="number"
              placeholder="Phone No"
              className='border-2 w-full sm:w-96 h-12 rounded-full text-center hover:border-yellow-300 outline-green-400'
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="p-2 pl-4">
            <input
              type="email"
              placeholder="Email"
              className='border-2 w-full sm:w-96 h-12 rounded-full text-center hover:border-yellow-300 outline-green-400'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="p-2 pl-4">
            <input
              type="password"
              placeholder="Password"
              className='border-2 w-full sm:w-96 h-12 rounded-full text-center hover:border-yellow-300 outline-green-400'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Admin Role Checkbox */}
          <div className="p-2 pl-4 flex items-center">
            <input
              type="checkbox"
              id="admin"
              className="mr-2"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}  // Toggle the admin role
            />
            <label htmlFor="admin">Register as Admin</label>
          </div>

          {/* Submit Button */}
          <div className="p-4">
            <button
              type="submit"
              className="w-full md:w-96 h-12 rounded-full bg-green-400 font-bold text-pink-500 p-2 hover:bg-green-500"
            >
              REGISTER USER
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center font-semibold p-2">
            Already have an account?
            <Link to='/' className="text-blue-500 hover:underline p-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
