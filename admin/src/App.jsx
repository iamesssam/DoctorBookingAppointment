import React from 'react'
import Login from './pages/Login'
import { Toaster } from 'sonner'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
// import TheNav from './components/TheNav'
import Sidebar from './components/Sidebar'
// import Navbar from './components/'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext'

import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorAppointment from './pages/doctor/DoctorAppointment'
import DoctorProfile from './pages/doctor/DoctorProfile'
const App = () => {

  const { token } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return token || dToken ? (
    <div>
      <Toaster position='top-right' />
      <Navbar />

      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/allAppointments' element={<AllAppointments />} />
          <Route path='/addDoctor' element={<AddDoctor />} />
          <Route path='/doctorList' element={<DoctorsList />} />

          {/* Doctor Route */}
          <Route path='/doctorDashboard' element={<DoctorDashboard />} />
          <Route path='/doctorAppointment' element={<DoctorAppointment />} />
          <Route path='/doctorProfile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) :
    (
      <>
        <Login />
        <Toaster position='top-right' />
      </>
    )
}

export default App
