import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PsychologistDashboard = () => {
  const navigate = useNavigate()

  return (
    <Container className="text-center mt-5">
      <h2>Benvenuto nella tua Dashboard</h2>
      <p>Qui vedrai la tua area personale una volta implementata.</p>
      <Button onClick={() => navigate('/')}>Torna alla Home</Button>
    </Container>
  )
}

export default PsychologistDashboard
