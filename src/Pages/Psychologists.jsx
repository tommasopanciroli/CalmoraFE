import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap'
import UserNavbar from '../Components/UserNavbar'
import '../Styles/Psychologists.css'

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      <UserNavbar />
      <Container className="mt-4">
        <Row>
          {psychologists.map((psycho) => (
            <Col
              key={psycho.id}
              md={4}
              className="d-flex align-items-stretch mb-4"
            >
              <Card className="w-100 text-center">
                <Card.Img />
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
    </>
  )
}

export default Psychologists
