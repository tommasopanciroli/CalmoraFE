import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import '../Styles/Homepage.css'

const Homepage = () => {
  return (
    <>
      <MyNavbar />
      <Container fluid id="hp">
        <Row className="align-items-center">
          <Col md={6} className="mt-5 ms-5">
            <h1 id='title'>Benvenuti in Calmora</h1>
            <p>
              La tua piattaforma per il benessere mentale. Scopri i nostri
              servizi e inizia il tuo percorso verso un equilibrio migliore.
            </p>
            <button class="myButton">Accedi</button>
            <button class="myButton">Registrati</button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Homepage
