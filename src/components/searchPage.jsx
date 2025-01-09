import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Search() {
  // State hooks for managing search results and input queries
  const [searchResult, setSearchResult] = useState([]); // Holds the search results
  const [depKey, setDepKey] = useState(""); // Departure airport IATA
  const [arrKey, setArrKey] = useState(""); // Arrival airport IATA

  // Set your AviationStack API key here
  const API_KEY = '0ba5cf4e6a93a44e5496ad2b32112205'; // Replace with your actual API key from AviationStack

  // useEffect hook to trigger the search function when either depKey or arrKey state changes
  useEffect(() => {
    const search = async () => {
      try {
        // Avoid making a request if either input is empty
        if (!depKey.trim() || !arrKey.trim()) {
          setSearchResult([]); // Clear results if inputs are empty
          return;
        }

        // Make the request to the AviationStack API using Axios
        const res = await axios.get("https://api.aviationstack.com/v1/flights", {
          params: {
            access_key: API_KEY, // API key for authentication
            dep_iata: depKey, // Source airport IATA code (departure)
            arr_iata: arrKey, // Destination airport IATA code (arrival)
            limit: 20, // Limit the number of results
          },
        });

        // Check if the response contains data and set it in the state
        if (res.data.data && res.data.data.length > 0) {
          setSearchResult(res.data.data); // Correct data structure
        } else {
          setSearchResult([]); // No results found
        }
      } catch (error) {
        console.log(error); // Log any errors during the request
      }
    };

    search(); // Call the search function whenever 'depKey' or 'arrKey' changes
  }, [depKey, arrKey]); // Dependency on 'depKey' and 'arrKey', runs every time they change

  return (
    <form className='bg-gray-300 w-full h-full'>
      <div>
        {/* Search input fields for Departure and Arrival IATA codes */}
        <div className='flex flex-col sm:flex-row justify-evenly'>
          <div className='p-2 grid place-items-center'>
            <input
              type="text"
              placeholder="Enter Departure Airport Code (IATA)"
              value={depKey} // Bind the departure input value to 'depKey'
              onChange={(e) => setDepKey(e.target.value)} // Update 'depKey' state on input change
              className='w-full sm:w-96 h-12 border-2 border-gray-400 rounded-full text-center outline-green-400' // Responsive width
            />
          </div>

          <div className='p-2 grid place-items-center'>
            <input
              type="text"
              placeholder="Enter Arrival Airport Code (IATA)"
              value={arrKey} // Bind the arrival input value to 'arrKey'
              onChange={(e) => setArrKey(e.target.value)} // Update 'arrKey' state on input change
              className='w-full sm:w-96 h-12 border-2 border-gray-400 rounded-full text-center outline-green-400' // Responsive width
            />
          </div>
        </div>

        <hr className='border-gray-500 border-2' />
        
        {/* Conditionally render search results */}
        {searchResult && searchResult.length > 0 && (
          <div className='p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-4'>
            {searchResult.map((flight) => (
              <Link to={`/flight/${flight.flight.iata}`} key={flight.flight.iata}>
                <div className='p-2 border-2 border-gray-400 w-full sm:w-96 lg:w-80 h-76 mb-2 rounded-xl shadow-lg bg-white'>
                  <div>
                    {/* Flight Information */}
                    <p className="font-semibold text-center p-2">Flight Number: {flight.flight.iata}</p>
                    <p className="font-semibold text-center p-2">Airline: {flight.airline.name}</p>
                    <p className="font-semibold text-center p-2">Flight Status: {flight.flight_status}</p>

                    {/* Departure and Arrival Details */}
                    <div className="p-2">
                      <p className="font-semibold text-center">Departure:</p>
                      <p className="text-center">{flight.departure.airport}</p>
                      <p className="text-center">Scheduled: {new Date(flight.departure.scheduled).toLocaleString()}</p>
                      <p className="text-center">Estimated: {new Date(flight.departure.estimated).toLocaleString()}</p>
                    </div>

                    <div className="p-2">
                      <p className="font-semibold text-center">Arrival:</p>
                      <p className="text-center">{flight.arrival.airport}</p>
                      <p className="text-center">Scheduled: {new Date(flight.arrival.scheduled).toLocaleString()}</p>
                      <p className="text-center">Estimated: {new Date(flight.arrival.estimated).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom navigation bar */}
      <div className='p-2 flex justify-evenly bg-gray-400 w-full fixed bottom-0'>
        <button>
          <img src='/src/assets/images/Search.png' alt='Search' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </button>
        <Link to='/flight'>
          <img src='/src/assets/images/Admin.png' alt='Admin' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </Link>
        <Link to='/profile'>
          <img src='/src/assets/images/Profile.png' alt='Profile' className='w-18 h-8 rounded-full hover:bg-teal-300 p-2' />
        </Link>
      </div>
    </form>
  );
}
