import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Nav, NavLink, Navbar } from 'react-bootstrap'
import '../Styles/UserNavbar.css'

const UserNavbar = () => {
  return (
    <Navbar id='userNavbar'>
      <Container fluid className="ms-3">
        <Navbar.Brand>
          <img src="/logoCalmora.png" style={{ width: '60px' }}></img>
        </Navbar.Brand>
        <Navbar.Brand as={Link}>Calmora</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>Psicologi</Nav.Link>
          <NavLink as={Link} to={'/dashboardUser'}>
            Il mio profilo
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default UserNavbar
