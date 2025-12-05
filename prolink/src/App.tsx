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
import CompanyLayout from './components/company/CompanyLayout'
import AdminDashboard from './components/admin/Dashboard'
import CompanyDashboard from './pages/company/Dashboard'
import ClientDashboard from './pages/client/Dashboard'
import AdminLayout from './components/admin/AdminLayout'
import ClientLayout from './components/client/ClientLayout'
import CompanyProfileSetup from './pages/company/ProfileSetup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './pages/auth/ProtectedRoutes'
import Profile from './pages/company/Profile'
import SimilarCompanies from './pages/client/SimilarCompanies'
import ViewRequirement from './pages/client/requirement/ViewRequirement'
import AddRequirement from './pages/client/requirement/AddRequirement'
import QuotesPage from './pages/client/quotes/QuotesPage'

function App() {
   const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
         <ToastContainer/>
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


                    {/* <Route element={<ProtectedRoute requiredRole='COMPANY'/>}> */}
                      <Route path='/company' element={<CompanyLayout/>}>
                        <Route path='' element={<CompanyDashboard/>} />
                        <Route path='setup' element={<CompanyProfileSetup/>}/>
                        <Route path='profile' element={<Profile/>}/>
                      </Route>
                    {/* </Route> */}

                    <Route element={<ProtectedRoute requiredRole='ADMIN'/>}>
                      <Route path='/admin' element={<AdminLayout/>}>
                        <Route path='' element={<AdminDashboard/>} />
                      </Route>
                    </Route>


                    {/* <Route element={<ProtectedRoute requiredRole='CLIENT'/>}> */}
                      <Route path='/client' element={<ClientLayout/>}>
                        <Route path='dashboard' element={<ClientDashboard/>} />
                        <Route path='requirement'>
                          <Route path='view' element={<ViewRequirement/>} />
                          <Route path='quotes' element={<QuotesPage/>} />
                         </Route>
                        <Route path='7/companies' element={<SimilarCompanies/>} />
                      </Route>
                    {/* </Route> */}
                </Routes>
              </BrowserRouter>
        </QueryClientProvider>
    </>
  )
}

export default App
