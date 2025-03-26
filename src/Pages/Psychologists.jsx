import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Modal,
  Button,
  Form,
} from 'react-bootstrap'
import UserNavbar from '../Components/UserNavbar'
import '../Styles/Psychologists.css'
import Colloquio from '../Images/colloquio.jpg'
import SearchBar from '../Components/SearchBar'
import MyFooter from '../Components/MyFooter'

const Psychologists = ({ setIsAuthenticated, setUserRole }) => {
  const [psychologists, setPsychologists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [selectedPsychologist, setSelectedPsychologist] = useState(null)

  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:8080/api/psychologists', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento degli psicologi')
        }
        return response.json()
      })
      .then((data) => {
        setPsychologists(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  const handleCardClick = (psycho) => {
    setSelectedPsychologist(psycho)
    setShowModal(true)
  }

  const handleBookAppointment = (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    const appointDateTime = `${appointmentDate}T${appointmentTime}:00`

    fetch(
      `http://localhost:8080/api/appointments?psychologistId=${
        selectedPsychologist.id
      }&dataAppuntamento=${encodeURIComponent(appointDateTime)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(),
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error('Errore nella prenotazione: ' + errorText)
          })
        }
        return response.json()
      })
      .then((data) => {
        console.log('Appuntamento prenotato con successo:', data)
        setAppointmentDate('')
        setAppointmentTime('')
        setShowModal(false)
      })
      .catch((error) => {
        console.error('Errore durante la prenotazione:', error.message)
      })
  }

  if (loading) {
    return (
      <Spinner animation="border" className="d-block mx-auto mt-5">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  if (error)
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    )

  return (
    <>
      <UserNavbar
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />
      <SearchBar style={{ marginTop: '20px', width: '100%' }} />
      <Container className="mt-4">
        <Row>
          {psychologists.map((psycho) => (
            <Col
              key={psycho.id}
              md={4}
              className="d-flex align-items-stretch mb-4"
            >
              <Card
                className="w-100 text-center"
                onClick={() => handleCardClick(psycho)}
              >
                <Card.Img src={Colloquio} className="card-img-top" />
                <Card.Body>
                  <Card.Title>
                    {psycho.name} {psycho.surname}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <MyFooter />

      <Modal
        contentClassName="booking-modal"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Prenota un Appuntamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPsychologist && (
            <>
              <p>
                <strong>Nome:</strong> {selectedPsychologist.name}
              </p>
              <p>
                <strong>Cognome:</strong> {selectedPsychologist.surname}
              </p>
              <p>
                <strong>Email:</strong> {selectedPsychologist.email}
              </p>
              <Form onSubmit={handleBookAppointment}>
                <Form.Group className="mb-3">
                  <Form.Label>Data Appuntamento</Form.Label>
                  <Form.Control
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Orario Appuntamento</Form.Label>
                  <Form.Control
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  />
                </Form.Group>
                <button id="book-button" type="submit">
                  Prenota
                </button>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button id='close-button' onClick={() => setShowModal(false)}>Chiudi</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Psychologists
