import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MyNavbar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container fluid className="ms-3">
        <Navbar.Brand>
          <img src="/logoCalmora.png" style={{ width: '60px' }}></img>
        </Navbar.Brand>
        <Navbar.Brand as={Link}>Calmora</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={onLoginClick}>Accedi</Nav.Link>
          <Nav.Link onClick={onRegisterClick}>Registrati</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
