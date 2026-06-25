import React from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Register from './pages/Register'
import Login from './pages/Login'

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { Toaster } from "sonner";

const stripePromise = loadStripe('pk_test_51TYk4IDWnS44d1MnRljhpJsSJDGAeza1TNBrZPLAdcTHWOpgqNU7d1nworK7MhlDSESF5RAbVgjGCFYjy8M3ytP0002GDrDV6p');

const App = () => {

  const location = useLocation();
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Toaster position='top-right' />
      <ScrollToTop />
      {
        location.pathname !== "/login" &&
        <Navbar />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:specialty' element={<Doctors />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myProfile' element={<MyProfile />} />

        <Route path='/myAppointments' element={
          <Elements stripe={stripePromise}>
            <MyAppointments />
          </Elements>
        } />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
