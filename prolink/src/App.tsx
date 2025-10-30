import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import CustomLayout from './components/landing/CustomLayout'
import LandingPage from './pages/LandingPage'
import HowItWorks from './components/landing/HowItWorks'
import SmartFeatures from './components/landing/SmartFeatures'
import CompaniesSection from './components/landing/CompaniesSection'
import Testimonials from './components/landing/Testimonials'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import OtpVerify from './pages/auth/OtpVerify'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<CustomLayout/>}>
                <Route path="/" element={<LandingPage />} />
                <Route path='/how-it-works' element={<HowItWorks/>} />
                <Route path='/about-us' element={<SmartFeatures/>} />
                <Route path='/companies' element={<CompaniesSection/>} />
                <Route path='/testimonials' element={<Testimonials/>} />
              </Route>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/otp' element={<OtpVerify/>} />
                <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
