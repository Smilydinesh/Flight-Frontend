import { useEffect, useState } from "react"; // Import hooks from React for state and side effects
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for route parameters and navigation

const FlightDetails = () => {
  const params = useParams(); // Extract flight ID from the URL parameters
  const [flight, setFlight] = useState({}); // State to hold flight data
  const navigate = useNavigate(); // Hook for navigation to another route
  const [seats, setSeats] = useState(1); // State for number of seats
  const [selectedTime, setSelectedTime] = useState(""); // State for selected time
  const API_KEY = '0ba5cf4e6a93a44e5496ad2b32112205'; // Replace with your AviationStack API key
  const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${params.id}`; // API URL to get flight details

  // Fetch flight details when the component mounts or when the flight ID changes
  useEffect(() => {
    async function fetchFlightDetails() {
      fetch(url) // Send a GET request to the AviationStack API
        .then((res) => res.json()) // Parse the response as JSON
        .then((jsonData) => setFlight(jsonData.data[0])); // Set the fetched flight data to state
    }
    fetchFlightDetails(); // Trigger the data fetching
  }, [params.id]); // Dependency array: re-fetch data whenever flight ID changes

  // Update document title to the flight number for SEO purposes
  useEffect(() => {
    document.title = `Flight: ${flight.flight?.iata}`; // Set the browser tab title dynamically
  }, [flight.flight]); // Re-run when the flight data is updated

  // Function to get the current date in a readable format
  const getCurrentDate = () => {
    const currentDate = new Date(); // Get the current date
    return currentDate.toLocaleDateString(); // Return the current date as a string (localized)
  };

  // Predefined available times for booking (you can change this logic based on flight schedules)
  const availableTimes = ["10:00", "14:00", "18:00", "21:00"]; // Available time slots

  // Base price for a single seat (you can adjust this value)
  const basePrice = 5500; // Price for 1 seat

  // Handle the booking click event (navigates to ticket confirmation page)
  const handleBooking = () => {
    const date = getCurrentDate(); // Get the current date
    const time = selectedTime || availableTimes[Math.floor(Math.random() * availableTimes.length)]; // Use selected time or pick random time
    
    // Calculate the total price based on the number of seats
    const price = basePrice * seats; // Total price = base price * number of seats

    // Navigate to the ticket confirmation page with booking details as state
    navigate('/ticket', {
      state: {
        flightNumber: flight.flight?.iata, // Pass flight number
        date: date, // Pass current date
        time: time, // Pass selected or random available time
        seats: seats, // Pass the number of seats
        price: price // Pass the total price
      }
    });
  };

  return (
    <div className="bg-gray-400 w-full h-screen">
      {/* Flight Information */}
      <div className="flex justify-center p-4">
        <div className='p-1 rounded-md'>
          {/* Displaying Flight Information */}
          <p className="p-2 font-semibold text-2xl flex justify-center">{flight.flight?.iata}</p>
          <p className="p-2 font-semibold text-center">Airline: {flight.airline?.name}</p>
        </div>
      </div>

      {/* Flight Date and Status */}
      <div className="grid place-items-center">
        <div className="p-2 m-2 w-3/4 sm:w-1/2 lg:w-1/3 border-2 border-black rounded-md">
          <p><strong>Flight Date:</strong> {flight.flight_date}</p>
          <p><strong>Status:</strong> {flight.flight_status}</p>
        </div>
      </div>

      {/* Departure Information */}
      <div className="grid place-items-center">
        <div className="p-2 m-2 w-3/4 sm:w-1/2 lg:w-1/3 border-2 border-black rounded-md">
          <p><strong>Departure Airport:</strong> {flight.departure?.airport}</p>
          <p><strong>Scheduled Departure:</strong> {new Date(flight.departure?.scheduled).toLocaleString()}</p>
          <p><strong>Estimated Departure:</strong> {new Date(flight.departure?.estimated).toLocaleString()}</p>
        </div>
      </div>

      {/* Arrival Information */}
      <div className="grid place-items-center">
        <div className="p-2 m-2 w-3/4 sm:w-1/2 lg:w-1/3 border-2 border-black rounded-md">
          <p><strong>Arrival Airport:</strong> {flight.arrival?.airport}</p>
          <p><strong>Scheduled Arrival:</strong> {new Date(flight.arrival?.scheduled).toLocaleString()}</p>
          <p><strong>Estimated Arrival:</strong> {new Date(flight.arrival?.estimated).toLocaleString()}</p>
        </div>
      </div>

      {/* Number of Seats Selection */}
      <div className="flex justify-center p-4">
        <label htmlFor="seats" className="font-semibold text-xl">Number of Seats:</label>
        <input 
          type="number" 
          id="seats" 
          value={seats} 
          onChange={(e) => setSeats(Number(e.target.value))} // Update the number of seats
          min="1" 
          className="ml-2 p-2 w-20 border-2 border-black rounded-md"
        />
      </div>

      {/* Select Time */}
      <div className="flex justify-center p-4">
        <label htmlFor="time" className="font-semibold text-xl">Select Time:</label>
        <select 
          id="time" 
          value={selectedTime} 
          onChange={(e) => setSelectedTime(e.target.value)} // Update the selected time
          className="ml-2 p-2 w-32 border-2 border-black rounded-md"
        >
          <option value="">Select Time</option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center p-2">
        <button 
          onClick={handleBooking} // Trigger booking when clicked
          className="p-2 bg-red-500 w-60 h-12 mb-2 text-lg text-white font-semibold rounded-md flex justify-center text-center hover:bg-red-600"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default FlightDetails;
