import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Booking = () => {
  // Retrieve the passed state from the previous route (flight details)
  const location = useLocation();
  const { source, destination, date, time, seats, price } = location.state || {};

  // Function to generate and download the flight ticket as a PDF
  const downloadTicketPDF = () => {
    const doc = new jsPDF(); // Create a new instance of jsPDF

    // Set font and add text to the PDF
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text("Flight Ticket", 20, 20); // Add a title for the ticket

    doc.setFontSize(12);
    doc.text(`Source: ${source}`, 20, 30); // Flight source (departure)
    doc.text(`Destination: ${destination}`, 20, 40); // Flight destination (arrival)
    doc.text(`Date: ${date}`, 20, 50); // Flight date
    doc.text(`Time: ${time}`, 20, 60); // Flight time
    doc.text(`Seats: ${seats}`, 20, 70); // Number of seats
    doc.text(`Price: $${price}`, 20, 80); // Total price

    // Trigger download of the generated PDF
    doc.save('flight-ticket.pdf');
  };

  return (
    <div className="bg-gray-300 w-full h-screen">
      <div className="flex justify-center p-4">
        <h1 className="text-3xl font-semibold text-center">Flight Booking Confirmed</h1> {/* Title of the page */}
      </div>

      {/* Display Confirmation Details */}
      <div className="grid place-items-center">
        <div className="p-4 m-4 w-full sm:w-96 border-2 border-black rounded-md bg-gray-400 shadow-lg">
          <p className="font-semibold text-lg text-center p-2">Flight Ticket</p>
          <p className="font-semibold p-1">Source: {source}</p> {/* Flight Source */}
          <p className="font-semibold p-1">Destination: {destination}</p> {/* Flight Destination */}
          <p className="font-semibold p-1">Date: {date}</p> {/* Flight Date */}
          <p className="font-semibold p-1">Time: {time}</p> {/* Flight Time */}
          <p className="font-semibold p-1">Seats: {seats}</p> {/* Number of Seats */}
          <p className="font-semibold p-1">Price: ${price}</p> {/* Total Price */}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-4 space-x-4">
        <button 
          onClick={() => window.location.href = '/search'} 
          className="w-full sm:w-60 p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Go to Homepage {/* Button to navigate to the homepage */}
        </button>
        
        {/* Download Ticket Button */}
        <button 
          onClick={downloadTicketPDF} 
          className="w-full sm:w-60 p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none"
        >
          Download Ticket {/* Button to trigger PDF download */}
        </button>
      </div>
    </div>
  );
};

export default Booking;
