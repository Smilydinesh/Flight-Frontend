// PaymentPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext'; // Import the custom hook to access user data
import emailjs from 'emailjs-com';

const PaymentPage = () => {
  const location = useLocation(); // Get the location object to access state passed from the previous page
  const navigate = useNavigate(); // Hook for navigation to redirect user

  // Get the user info (including email) from context
  const { user } = useUser(); // Access user data from context
  const userEmail = user?.email; // Get the email from the user object

  // Destructure booking details from location.state (received from the previous page)
  const { source, destination, date, time, seats, price } = location.state || {};

  // State hooks to manage card details input
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');

  // Handle form submission to simulate payment processing
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    
    // Simulate a successful payment response (you would integrate actual payment API here)
    const paymentSuccess = true; // In a real scenario, this would depend on the payment gateway response

    if (paymentSuccess) {
      // Create an object with the payment details and booking details
      const paymentDetails = {
        source,
        destination,
        date,
        time,
        seats,
        price,
        cardNumber,
        expiration,
        cvv
      };

      // Send email notification to user using EmailJS
      const emailParams = {
        source,
        destination,
        date,
        time,
        seats,
        price,
        userEmail: userEmail || "default-email@example.com", // Fallback if user email is not available
      };

      try {
        await emailjs.send(
          'service_iw5a74v',        // Service ID from EmailJS
          'template_3sixhoe',       // Template ID from EmailJS
          emailParams,
          'mI-tXmrrqN-5f9wC3'            // User ID from EmailJS
        );
        alert('Payment successful and email sent!');
      } catch (error) {
        console.error('Email sending error:', error);
        alert('Payment successful, but failed to send confirmation email.');
      }

      // Navigate to the booking confirmation page and pass the payment details
      navigate('/booking', { state: paymentDetails });
    } else {
      alert('Payment failed. Please check your details.');
    }
  };

  return (
    <div className="bg-gray-300 w-full h-screen">
      {/* Display Booking Details */}
      <div className="grid place-items-center p-4">
        <div className="p-2 m-2 w-96 border-2 bg-gray-400 border-black rounded-md">
          <p className="font-semibold">Source: {source}</p>
          <p className="font-semibold">Destination: {destination}</p>
          <p className="font-semibold">Date: {date}</p>
          <p className="font-semibold">Time: {time}</p>
          <p className="font-semibold">Seats: {seats}</p>
          <p className="font-semibold">Price: ${price}</p>
        </div>
      </div>

      {/* Payment Form Section */}
      <div className="grid place-items-center">
        <div className="border-2 border-gray-500 bg-gray-400 p-4 rounded-md w-full sm:w-96">
          <div className="flex justify-center p-4">
            <h1 className="text-3xl font-semibold">Enter Your Card Details</h1>
          </div>

          {/* Card Payment Form */}
          <div className="flex justify-center mt-4">
            <form className="w-full sm:w-96 p-4 border-2 border-gray-500 rounded-md" onSubmit={handlePaymentSubmit}>
              {/* Card Number Input */}
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block font-semibold">Card Number</label>
                <input 
                  type="text" 
                  id="cardNumber" 
                  className="border-2 w-full h-12 rounded-full text-center hover:border-yellow-300 outline-green-400"
                  placeholder="Enter your card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>

              {/* Expiration Date Input */}
              <div className="mb-4">
                <label htmlFor="expiration" className="block font-semibold">Expiration Date</label>
                <input 
                  type="text" 
                  id="expiration" 
                  className="border-2 w-full h-12 rounded-full text-center hover:border-yellow-300 outline-green-400"
                  placeholder="MM/YY"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  required
                />
              </div>

              {/* CVV Input */}
              <div className="mb-4">
                <label htmlFor="cvv" className="block font-semibold">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  className="border-2 w-full h-12 rounded-full text-center hover:border-yellow-300 outline-green-400"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>

              {/* Pay Now Button */}
              <button 
                type="submit" 
                className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
