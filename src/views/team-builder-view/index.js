import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Challenges from "../../components/challenges";
import Ladder from "../../components/ladder";
import PokemonTrainer from "../../components/pokemon-trainer";
import PokemonPlaceholder from "../../components/pokemon-placeholder";
import Chat from "../../components/chat";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function TeamBuilderView() {
  return (
    <Container fluid>
      <Row>
        <Challenges/>
      </Row>
      <Row>
        <Ladder/>
      </Row>
      <Row>
        <PokemonPlaceholder/>
        <PokemonPlaceholder/>
        <PokemonPlaceholder/>
        <PokemonTrainer/>
        <PokemonPlaceholder/>
        <PokemonPlaceholder/>
        <PokemonPlaceholder/>
      </Row>
      <Row>
        <Col>
          <Chat/>
        </Col>
        <Col>
          <Row>
            <Button>Solos</Button>
          </Row>
          <Row>
            <Button>Play</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default TeamBuilderView;