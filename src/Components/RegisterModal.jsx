import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../Styles/RegisterModal.css'

const RegisterModal = ({
  show,
  handleClose,
  setIsAuthenticated,
  setUserRole,
}) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('ROLE_USER')
  const [certificate, setCertificate] = useState(null)
  const navigate = useNavigate()

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleRegister = async (e) => {
    e.preventDefault()

    let certificateBase64 = ''
    if (role === 'ROLE_PSYCHOLOGIST' && certificate) {
      try {
        certificateBase64 = await toBase64(certificate)
      } catch (error) {
        console.error('Errore nella conversione del file:', error)
      }
    }

    const payload = {
      name,
      surname,
      email,
      password,
      role,
      urlCertificato: certificateBase64, // invia il file come Base64
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error('Errore nella registrazione: ' + errorText)
      }

      const data = await response.text()
      console.log('Utente registrato:', data)

      setIsAuthenticated(true)
      setUserRole(role)

      handleClose()

      if (role === 'ROLE_USER') {
        navigate('/dashboardUser')
      } else if (role === 'ROLE_PSYCHOLOGIST') {
        navigate('/dashboardPsychologist')
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error.message)
    }
  }

  return (
    <Modal contentClassName='register-modal-content' show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrati</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il tuo nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il tuo cognome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </Form.Group>
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
              placeholder="Crea una password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ruolo</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="ROLE_USER">Utente</option>
              <option value="ROLE_PSYCHOLOGIST">Psicologo</option>
            </Form.Select>
          </Form.Group>

          {role === 'ROLE_PSYCHOLOGIST' && (
            <Form.Group className="mb-3">
              <Form.Label>Carica certificato</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCertificate(e.target.files[0])}
                required
              />
            </Form.Group>
          )}

          <button id='register-button'>Registrati</button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal
