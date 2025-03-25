import React, { useState } from 'react'
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  InputGroup,
  Modal,
} from 'react-bootstrap'
import Colloquio from '../Images/colloquio.jpg'
import '../Styles/SearchBar.css'

const SearchBar = ({ style }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [selectedPsychologist, setSelectedPsychologist] = useState(null)
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')

  const token = localStorage.getItem('token')

  const handleSearch = (e) => {
    e.preventDefault()

    if (!query.trim()) return

    setLoading(true)
    setError('')

    fetch(
      `http://localhost:8080/api/auth/search?keyword=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nella ricerca')
        }
        return response.json()
      })
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Errore nella ricerca:', err.message)
        setError(err.message)
        setLoading(false)
      })
  }

  const handleCardClick = (psycho) => {
    setSelectedPsychologist(psycho)
    setShowModal(true)
  }

  const handleBookAppointment = (e) => {
    e.preventDefault()
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
        body: JSON.stringify({}),
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

  return (
    <>
      <Container
        className="d-flex justify-content-center"
        style={{ maxWidth: '500px', ...style }}
      >
        <Form onSubmit={handleSearch}>
          <InputGroup>
            <Form.Group controlId="searchQuery">
              <Form.Control
                type="text"
                placeholder="Cerca uno psicologo..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
            <button id='search-button'>Cerca</button>
          </InputGroup>
        </Form>
      </Container>
      <Container>
        {loading && (
          <div className="mt-3 text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <Row className="mt-4">
          {results.length > 0
            ? results.map((psycho) => (
                <Col
                  key={psycho.id}
                  md={4}
                  className="d-flex align-items-stretch mb-4"
                >
                  <Card
                    className="w-100 text-center"
                    onClick={() => handleCardClick(psycho)}
                  >
                    <Card.Img
                      src={Colloquio}
                      className="card-img-top"
                      alt="Immagine Psicologo"
                    />
                    <Card.Body>
                      <Card.Title>
                        {psycho.name} {psycho.surname}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : !loading && query && <p>Nessun risultato trovato.</p>}
        </Row>
      </Container>

      <Modal contentClassName="booking-modal" show={showModal} onHide={() => setShowModal(false)} centered>
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
                <button id='book-button' type="submit">Prenota</button>
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

export default SearchBar
