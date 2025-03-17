import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import '../Styles/Homepage.css'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const Homepage = ({ setIsAuthenticated }) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <>
      <MyNavbar onLoginClick={() => setShowLogin(true)}
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
      </Container>

      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        setIsAuthenticated={setIsAuthenticated}
      />
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        setIsAuthenticated={setIsAuthenticated}
      />
    </>
  )
}

export default Homepage
