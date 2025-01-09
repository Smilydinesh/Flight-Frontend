import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/loginUser';
import SignUp from './components/registerUser';
import ForgotPassword from './components/forgotPassword';
import Search from './components/searchPage';
import Profile from './components/profilePage';
import FlightForm from './components/flightForm';
import Ticket from './components/myTicket';
import Booking from './components/tickets';
import PaymentPage from './components/paymentPage';
import FlightDetails from './components/flightDetails';
import { UserProvider } from './context/userContext';

function App() {
   
  return (
    <>
    <UserProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/search' element={<Search />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/flight' element={<FlightForm />} />
        <Route path='/ticket' element={<Ticket />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/flight/:id' element={<FlightDetails />} />
      </Routes>
    </Router>
    </UserProvider>
    </>
  )
}

export default App;