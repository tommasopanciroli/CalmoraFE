import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserDashboard from './Pages/UserDashboard'
import PsychologistDashboard from './Pages/PsychologistDashboard'
import Psychologists from './Pages/Psychologists'
import MyFooter from './Components/MyFooter'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                userRole === 'ROLE_USER' ? (
                  <Navigate
                    to={`/dashboardUser/${localStorage.getItem('userId')}`}
                    replace
                  />
                ) : (
                  <Navigate
                    to={`/dashboardPsychologist/${localStorage.getItem(
                      'userId'
                    )}`}
                    replace
                  />
                )
              ) : (
                <Homepage
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                />
              )
            }
          />
          <Route
            path="/dashboardUser/:id?"
            element={
              isAuthenticated ? (
                <UserDashboard
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/dashboardPsychologist/:id?"
            element={
              isAuthenticated ? (
                <PsychologistDashboard
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/psicologi"
            element={
              isAuthenticated ? (
                <Psychologists
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                />
              ) : (
                <Navigate to={'/'} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
