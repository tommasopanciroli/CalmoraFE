import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import MyNavbar from '../Components/MyNavbar'
import '../Styles/Homepage.css'
import LoginModal from '../Components/LoginModal'
import RegisterModal from '../Components/RegisterModal'
import HomepageCards from '../Components/HomepageCards'
import MyFooter from '../Components/MyFooter'

const Homepage = ({ setIsAuthenticated, setUserRole }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <>
      <MyNavbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
      <Container fluid id="hp">
        <Row className="align-items-center">
          <Col md={6} className="mt-5 ms-5">
            <h1 id="title">Benvenuti in Calmora</h1>
            <p>
              La tua piattaforma per il benessere mentale. Scopri i nostri
              servizi e inizia il tuo percorso verso un equilibrio migliore.
            </p>
            <button className="myButton" onClick={() => setShowLogin(true)}>
              Accedi
            </button>
            <button className="myButton" onClick={() => setShowRegister(true)}>
              Registrati
            </button>
          </Col>
        </Row>
        <div id="cards">
          <HomepageCards />
        </div>
      </Container>
      <MyFooter />

      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />
    </>
  )
}

export default Homepage
