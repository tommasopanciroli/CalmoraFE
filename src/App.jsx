import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Components/Homepage'
import Dashboard from './Components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Homepage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
