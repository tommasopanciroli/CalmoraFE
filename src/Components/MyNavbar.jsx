import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../Styles/MyNavbar.css'

const MyNavbar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <Navbar id='myNavbar'>
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
