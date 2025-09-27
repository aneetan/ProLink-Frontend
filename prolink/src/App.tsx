import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import CustomLayout from './components/landing/CustomLayout'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<CustomLayout/>}>
                <Route path="/" element={<LandingPage />} />
              </Route>
                 
                <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
