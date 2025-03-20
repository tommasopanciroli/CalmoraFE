import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import profilePic from '../Images/profile.jpeg'
import '../Styles/UserDashboard.css'
import UserNavbar from '../Components/UserNavbar'

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const firstName = localStorage.getItem('name')
  const lastName = localStorage.getItem('surname')
  const email = localStorage.getItem('email')

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('Token recuperato', token)

    fetch('http://localhost:8080/api/appointments/my', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nella risposta del server')
        }
        return response.json()
      })
      .then((data) => {
        setAppointments(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <UserNavbar />
      <Container>
        <div className="dashboard-header text-center mt-5">
          <h2>
            Benvenuto nella tua Dashboard
            {firstName && lastName ? `, ${firstName} ${lastName}` : ''}
          </h2>
          <p>Qui vedrai la tua area personale.</p>
        </div>

        <div className="dashboard-body">
          <div className="profile-column">
            <img id="profileimg" src={profilePic} alt="profilePic" />
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
                      <strong>Data:</strong> {a.date}
                    </p>
                    <p>
                      <strong>Descrizione:</strong> {a.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <button id="prenota">Prenota un appuntamento</button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default UserDashboard
