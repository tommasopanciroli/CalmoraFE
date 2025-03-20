import React from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap'
import Health from'../Images/Health.jpg'
import Training from '../Images/Training.jpg'
import SelfLove from '../Images/SelfLove.jpg'


const HomepageCards = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card className="">
            <Card.Img variant="top" src={Health} />
            <Card.Body>
              <Card.Title>Prenditi una pausa</Card.Title>
              <Card.Text>Devi prenderti una pausa ogni tanto, ascoltare il tuo corpo e la tua mente non farà altro che aiutarti.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="">
            <Card.Img variant="top" src={SelfLove} />
            <Card.Body>
              <Card.Title>Amati</Card.Title>
              <Card.Text>Ama te stesso prima di chiunque altro. Nella vita ci sei tu e poi tutti gli altri è importante prendersi cura di se stessi.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="">
            <Card.Img variant="top" src={Training} />
            <Card.Body>
              <Card.Title>Tieni la mente allenata</Card.Title>
              <Card.Text>Parlare con qualcuno di come ti senti è un modo per mantenere allenata la mente e ricordarti quali sono i tuoi problemi.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default HomepageCards;
