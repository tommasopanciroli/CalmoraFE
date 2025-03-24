import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import profilePic from '../Images/colloquio.jpg'

const PsychologistDashboard = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const firstName = localStorage.getItem('name')
  const lastName = localStorage.getItem('surname')
  const email = localStorage.getItem('email')

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('Token recuperato', token)

    fetch('http://localhost:8080/api/appointments/psychologist/my', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nella recupero degli appuntamenti')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Appuntamenti ricevuti', data)

        setAppointments(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Container className="text-center mt-5">
        <div>
          <h2>
            Benvenuto nella tua dashboard,{' '}
            {firstName && lastName ? `${firstName} ${lastName}` : ''}
          </h2>
          <p>Qui potrai vedere la tua area personale.</p>
        </div>

        <div className="dashboard-body">
          <div className="profile-column">
            <img style={{ width: '300px' }} id="profileimg" src={profilePic} alt="profilePic" />
            <div id="userInfo">
              <h3>I tuoi dati</h3>
              <p>Email: {email}</p>
              <p>Nome: {firstName}</p>
              <p>Cognome: {lastName}</p>
            </div>
          </div>
          <div id="appuntamenti">
            <h2>I tuoi appuntamenti</h2>
            {loading ? (
              <p>Caricamento...</p>
            ) : error ? (
              <p>Errore nel caricamento degli appuntamenti.</p>
            ) : appointments.length === 0 ? (
              <p>Nessun appuntamento prenotato.</p>
            ) : (
              <ul>
                {appointments.map((a) => (
                  <li key={a.id}>
                    <p>
                      <strong>Data:</strong>{' '}
                      {new Date(a.dataAppuntamento).toDateString('it-IT')}{' '}
                      {new Date(a.dataAppuntamento).toLocaleTimeString('it-IT')}
                    </p>
                    <p>
                      <strong>Paziente:</strong> {a.paziente.name}{' '}
                      {a.paziente.surname}
                    </p>
                    <p>
                      <strong>Sala virtuale: </strong> {a.psicologo.urlMeet}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default PsychologistDashboard
