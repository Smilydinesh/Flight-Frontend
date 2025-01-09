import { useLocation, useNavigate } from 'react-router-dom'; // Import necessary hooks for navigation and location handling

const Ticket = () => {
  const location = useLocation(); // Get the location object to access state passed from the previous page
  const navigate = useNavigate(); // Hook for navigation to redirect user after clicking "Pay Now"

  // Destructure flight details from location.state (received from the previous page)
  const { departure, arrival, date, time, seats, price } = location.state || {}; // Destructure the flight data from location.state

  // Function to handle the "Pay Now" button click
  const handlePayNow = () => {
    // Navigate to the payment page and pass the flight booking details as state
    navigate('/payment', {
      state: { departure, arrival, date, time, seats, price }
    });
  };

  return (
    <div className="bg-gray-300 w-full h-screen"> {/* Full screen background with gray color */}
      {/* Center the content on the screen */}
      <div className="grid place-items-center h-screen"> {/* Use grid to center content vertically and horizontally */}
        <div className="w-2/4 h-auto p-4 bg-gray-400 border-gray-500 border-2 rounded-md"> {/* Card for the flight details */}
          {/* Flight Details Title */}
          <div className="flex justify-center p-4">
            <h1 className="text-3xl font-semibold">Flight Confirmation</h1> {/* Title of the section */}
          </div>

          {/* Display flight details */}
          <div className="grid place-items-center">
            <div className="p-2 m-2 w-96 border-2 border-black rounded-md">
              {/* Flight details: FlightNumber, Departure, Arrival, Date, Time, Seats, Price */}
              <p className="font-semibold">Departure Airport: {departure?.airport}</p>
              <p className="font-semibold">Arrival Airport: {arrival?.airport}</p>
              <p className="font-semibold">Date: {date}</p>
              <p className="font-semibold">Time: {time}</p>
              <p className="font-semibold">Seats: {seats}</p>
              <p className="font-semibold">Price: ${price}</p>
            </div>
          </div>

          {/* Pay Now Button */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={handlePayNow} // When clicked, navigate to payment page with flight details
              className="p-2 bg-blue-500 w-60 h-12 text-lg text-white font-semibold rounded-md flex justify-center text-center hover:bg-blue-600"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;