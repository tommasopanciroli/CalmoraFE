import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../Styles/MyFooter.css'

const MyFooter = () => {
  return (
    <footer className="my-footer">
      <Container>
        <Row className="mb-3">
          <Col xs={12} className="text-center">
            <p className="mb-0 text-light">
              ©2025 Calmora Tutti i diritti riservati.
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col xs={12} md={6}>
            <ul className="list-unstyled d-inline-flex gap-3">
              <li>
                <a
                  href="https://github.com/tommasopanciroli"
                  className="text-light text-decoration-none"
                >
                  Contatto
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Condizioni e privacy
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={6} className="mt-3 mt-md-0">
            <ul className="list-unstyled d-inline-flex gap-3">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Avviso sui cookie
                </a>
              </li>
              <li>
                <a
                  href="https://epicode.com/"
                  className="text-light text-decoration-none"
                >
                  Partner
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <i className="bi bi-music-note-beamed fs-3"></i>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default MyFooter
