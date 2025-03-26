import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, NavLink, Navbar } from 'react-bootstrap'
import '../Styles/UserNavbar.css'

const UserNavbar = ({ setIsAuthenticated, setUserRole }) => {
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
        <Navbar.Brand as={Link}>Calmora</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={'/psicologi'}>
            Psicologi
          </Nav.Link>
          <NavLink
            as={Link}
            to={`/dashboardUser/${localStorage.getItem('userId')}`}
          >
            Il mio profilo
          </NavLink>
        </Nav>
        <Nav className='ms-auto'>
          <NavLink onClick={handleLogut}>
            Logout
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default UserNavbar
