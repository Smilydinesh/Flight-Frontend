import React, { useState, useEffect } from 'react'; // Import React and useState, useEffect hooks
import axios from 'axios'; // Import axios for making HTTP requests

const FlightForm = ({ flightNumber, existingFlightData, onSubmitSuccess }) => {
  // State to hold flight form data (source, destination, date, time, price, seats)
  const [flightData, setFlightData] = useState({
    source: '',
    destination: '',
    date: '',
    time: '',
    price: '',
    seats: '',
  });

  // Effect hook to pre-fill the form with existing flight data if provided
  useEffect(() => {
    if (existingFlightData) {
      setFlightData(existingFlightData); // Set initial state with existing flight data
    }
  }, [existingFlightData]);

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevData) => ({
      ...prevData,
      [name]: value, // Update the relevant field in the flight data state
    }));
  };

  // Handle form submission for adding or updating the flight
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      let response;
      if (flightNumber) {
        // If flightNumber exists, update flight
        response = await axios.put(`https://flight-backend-nqc8.onrender.com/api/flights/${flightNumber}`, flightData);
      } else {
        // If no flightNumber, add a new flight
        response = await axios.post('https://flight-backend-nqc8.onrender.com/api/flights', flightData);
      }

      // Check for successful response and reset the form
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message || 'Flight saved successfully');
        setFlightData({
          source: '',
          destination: '',
          date: '',
          time: '',
          price: '',
          seats: '',
        });
        onSubmitSuccess(); // Call success callback after form submission
      } else {
        alert('Failed to save flight');
      }
    } catch (error) {
      console.error('Error adding/updating flight', error);
      alert('Error adding/updating flight');
    }
  };

  // Handle delete flight action
  const handleDelete = async () => {
    if (!flightNumber) return; // Only proceed if `flightNumber` exists
    try {
      const response = await axios.delete(`https://flight-backend-nqc8.onrender.com/api/flights/${flightNumber}`);
      alert(response.data.message); // Show the response message after deletion
      onSubmitSuccess(); // Call success callback after deletion
    } catch (error) {
      alert('Error deleting flight'); // Show an error message if deletion fails
    }
  };

  return (
    <div className="bg-gray-300 w-full h-screen"> {/* Full-screen background */}
      {/* Centered form container */}
      <div className="grid place-items-center h-screen">
        <div className="max-w-lg mx-auto p-6 bg-gray-400 rounded-md shadow-md"> {/* Form container with rounded corners */}
          <h2 className="text-2xl font-semibold text-center mb-4">
            {flightNumber ? 'Edit Flight' : 'Add Flight'} {/* Title changes based on flightNumber */}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid place-items-center">
              {/* Source Input */}
              <input
                type="text"
                name="source"
                value={flightData.source}
                onChange={handleChange}
                placeholder="Source"
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
               {/* Destination Input */}
              <input
                type="text"
                name="destination"
                value={flightData.destination}
                onChange={handleChange}
                placeholder="Destination"
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Date Input */}
              <input
                type="date"
                name="date"
                value={flightData.date}
                onChange={handleChange}
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Time Input */}
              <input
                type="time"
                name="time"
                value={flightData.time}
                onChange={handleChange}
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Price Input */}
              <input
                type="number"
                name="price"
                value={flightData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Seats Input */}
              <input
                type="text"
                name="seats"
                value={flightData.seats}
                onChange={handleChange}
                placeholder="Seats"
                className="border-2 w-full sm:w-96 h-12 m-2 rounded-full text-center hover:border-yellow-300 outline-green-400"
                required
              />
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white m-2 font-semibold rounded-md hover:bg-blue-600"
              >
                {flightNumber ? 'Update Flight' : 'Submit Flight'} {/* Button text changes based on flightNumber */}
              </button>

              {/* Delete Button (only shown when editing an existing flight) */}
              {flightNumber && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full py-3 bg-red-500 text-white m-2 font-semibold rounded-md hover:bg-red-600 mt-4"
                >
                  Delete Flight
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightForm;
