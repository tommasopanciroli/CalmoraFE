import React, { useEffect, useState, useRef } from 'react'
import { Container, Button } from 'react-bootstrap'
import profilePic from '../Images/profile.jpeg'
import '../Styles/UserDashboard.css'
import UserNavbar from '../Components/UserNavbar'
import { Link } from 'react-router-dom'
import MyFooter from '../Components/MyFooter'
import '../Styles/MyFooter.css'

const UserDashboard = ({ setIsAuthenticated, setUserRole }) => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const firstName = localStorage.getItem('name')
  const lastName = localStorage.getItem('surname')
  const email = localStorage.getItem('email')
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  // eslint-disable-next-line no-unused-vars
  const [profileImageUrl, setProfileImageUrl] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [selectedFile, setSelectedFile] = useState(null)

  const fileInputRef = useRef(null)

  useEffect(() => {
    console.log('Token recuperato', token)

    fetch('http://localhost:8080/api/appointments/my', {
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
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

    fetch(`http://localhost:8080/api/auth/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.profileImageUrl) setProfileImageUrl(data.profileImageUrl)
        console.log(data)
      })
      .catch((error) =>
        console.error("Errore nel caricamento dell'immagine profilo ", error)
      )
  }, [userId, token])

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'Calmora')
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dr4bdbfcw/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
    const data = await response.json()
    console.log('Risposta Cloudinary:', data)
    return data.secure_url
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)

    const url = await uploadImageToCloudinary(file)

    await fetch(`http://localhost:8080/api/auth/${userId}/profile-image`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profileImageUrl: url }),
    })

    setProfileImageUrl(url)
    localStorage.setItem('profileImageUrl', url)
    setSelectedFile(null)
    console.log(url)
  }
  const handleDelete = (appointmentId) => {
    if (!window.confirm("Sei sicuro di voler cancellare l'appuntamento?"))
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
        console.error("Errore nella cancellazione dell'appuntamento:", error)
      })
  }

  return (
    <>
      <div className="layout-wrapper">
        <UserNavbar
          setIsAuthenticated={setIsAuthenticated}
          setUserRole={setUserRole}
        />
        <Container className="page-content">
          <div className="text-center mt-5">
            <h2>
              Benvenuto nella tua Dashboard
              {firstName && lastName ? `, ${firstName} ${lastName}` : ''}
            </h2>
            <p>Qui vedrai la tua area personale.</p>
          </div>

          <div className="dashboard-body">
            <div className="profile-column">
              <img id="profileimg" style={{ width: '300px' }} src={profileImageUrl || 'Images/avatar.png'} alt="profilePic" />
              <div id="userInfo">
                <h3>I tuoi dati</h3>
                <p>Email: {email}</p>
                <p>Nome: {firstName}</p>
                <p>Cognome: {lastName}</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />

              <button
                className="mt-2"
                onClick={() => fileInputRef.current.click()}
              >
                Modifica immagine profilo
              </button>
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
                        <strong>Psicologo:</strong> {a.psicologo.name}{' '}
                        {a.psicologo.surname}
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
              <Link to={'/psicologi'}>
                <button id="prenota">Prenota un appuntamento</button>
              </Link>
            </div>
          </div>
        </Container>
        <MyFooter />
      </div>
    </>
  )
}

export default UserDashboard
