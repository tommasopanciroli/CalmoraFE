import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LoginModal = ({ show, handleClose, setIsAuthenticated, setUserRole }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Errore nle login')
      }

      const data = await response.json()
      console.log('Risposta completa', data)

      console.log('Token ricevuto')
      console.log(data.token)

      console.log(data.role)
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', data.name)
      localStorage.setItem('surname', data.surname)
      localStorage.setItem('email', data.email)
      localStorage.setItem('userId', data.id)
      setIsAuthenticated(true)
      setUserRole(data.role)

      handleClose()
      if (data.role === 'ROLE_USER') {
        navigate(`/dashboardUser/${data.id}`)
      } else if (data.role === 'ROLE_PSYCHOLOGIST') {
        navigate('/dashboardPsychologist')
      }
    } catch (error) {
      console.error('Errore durante il login: ', error.message)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Accedi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci la password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Accedi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
