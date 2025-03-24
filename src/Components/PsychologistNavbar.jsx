import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import '../Styles/UserNavbar.css'

const PsychologistNavbar = ({ setIsAuthenticated, setUserRole }) => {
  const navigate = useNavigate()
  const handleLogut = () => {
    localStorage.clear()
    setIsAuthenticated(false)
    setUserRole('')
    navigate('/')
  }

  return (
    <Navbar id="userNavbar">
      <Container fluid className="ms-3">
        <Navbar.Brand>
          <img src="/logoCalmora.png" style={{ width: '60px' }}></img>
        </Navbar.Brand>
        <Navbar.Brand>Calmora</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={handleLogut}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default PsychologistNavbar
