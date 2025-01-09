import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const ForgotPassword = () => {
  // State hooks to manage form input, success message, and error message
  const [email, setEmail] = useState(''); // Email input value
  const [message, setMessage] = useState(''); // Success message after email submission
  const [error, setError] = useState(''); // Error message if something goes wrong
  const navigate = useNavigate(); // Hook for navigation after successful password reset

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Make a POST request to the backend with the email to trigger password reset
      const response = await axios.post('https://flight-backend-nqc8.onrender.com/user/forgot-password', { email });
      
      // On success, set the success message and navigate to the homepage or desired route
      setMessage(response.data.msg);
      navigate('/'); // Navigate to the home page after success
      setError(''); // Clear any previous error messages
    } catch (err) {
      // If there is an error, display the error message and clear success message
      setError(err.response.data.msg || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-[url('/src/assets/images/Flight.jpg')] bg-cover bg-center"> {/* Centering the form on the screen */}
      <div className='flex justify-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-auto border-2 border-gray-600 rounded-xl bg-gray-400'>
        <div>
          <h2 className='text-center font-bold p-4'>Forgot Password</h2> {/* Form title */}

          {/* Forgot password form */}
          <form onSubmit={handleSubmit}>
            {/* Email input field */}
            <div className='p-2'>
              <input
                type="email"
                id="email"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                required
                className='border-2 w-full sm:w-96 h-12 rounded-full text-center hover:border-yellow-300 outline-green-400' // Tailwind CSS styling
              />
            </div>

            {/* Submit button */}
            <div className='p-2'>
              <button 
                className="w-full md:w-96 h-12 rounded-full bg-green-400 font-bold text-pink-500 p-2 hover:bg-green-500" 
                type="submit">
                SEND EMAIL
              </button>
            </div>
          </form>

          {/* Display success or error messages */}
          {message && <div className='p-2 text-center text-md'>{message}</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
