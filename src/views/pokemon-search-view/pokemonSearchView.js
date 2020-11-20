import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Challenges from "../../components/challenges/challenges";
import Ladder from "../../components/ladder/ladder";
import Button from "../../components/button/button";
import Chat from "../../components/chat/chat";
import React from "react";

const pokemonSearchView = () => (
  <Container fluid className={"full-screen"}>
    <Row className={"content"}>
      <Row>
        <Col>
          <Challenges/>
        </Col>
      </Row>

      <Row>
        <Col>
          <Ladder/>
        </Col>
      </Row>

      <Row className="d-flex justify-content-end">
        <Col xs={4} md={3} xl={2}>
          <Button color="blue">Solos</Button>
          <Button type="inverse" color="yellow" height={100}>Play</Button>
        </Col>
      </Row>
    </Row>

    <Row className={"footer"}>
      <Col xs={6}>
        <Chat/>
      </Col>
    </Row>
  </Container>
);

export default pokemonSearchView;