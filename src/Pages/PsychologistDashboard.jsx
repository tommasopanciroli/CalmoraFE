import React from 'react'
import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import profilePic from '../Images/colloquio.jpg'
import '../Styles/PsychologistDashboard.css'
import PsychologistNavbar from '../Components/PsychologistNavbar'
import MyFooter from '../Components/MyFooter'

const PsychologistDashboard = ({ setIsAuthenticated, setUserRole }) => {
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

  const handleDelete = (appointmentId) => {
    const token = localStorage.getItem('token')
    if (!window.confirm('Sei sicuro di voler eliminare questo appuntamento?'))
      return

    fetch(`http://localhost:8080/api/appointments/${appointmentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella cancellazione dell'appuntamento")
        }
        return response.text()
      })
      .then(() => {
        setAppointments((prev) =>
          prev.filter((app) => app.id !== appointmentId)
        )
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione: ", error.message)
      })
  }

  return (
    <>
      <div className='layout-wrapper'>
        <PsychologistNavbar
          setIsAuthenticated={setIsAuthenticated}
          setUserRole={setUserRole}
        />
        <Container className="text-center mt-5 page-content">
          <div>
            <h2>
              Benvenuto nella tua dashboard,{' '}
              {firstName && lastName ? `${firstName} ${lastName}` : ''}
            </h2>
            <p>Qui potrai vedere la tua area personale.</p>
          </div>

          <div className="dashboard-body">
            <div className="profile-column">
              <img
                style={{ width: '300px' }}
                id="profileimg"
                src={profilePic}
                alt="profilePic"
              />
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
                        {new Date(a.dataAppuntamento).toLocaleTimeString(
                          'it-IT'
                        )}
                      </p>
                      <p>
                        <strong>Paziente:</strong> {a.paziente.name}{' '}
                        {a.paziente.surname}
                      </p>
                      <p>
                        <strong>Sala virtuale: </strong> {a.psicologo.urlMeet}
                      </p>
                      <button id="delete" onClick={() => handleDelete(a.id)}>
                        Elimina appuntamento
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Container>
        <MyFooter />
      </div>
    </>
  )
}

export default PsychologistDashboard
