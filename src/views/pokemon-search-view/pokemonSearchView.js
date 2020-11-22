import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chat from "../../components/chat/chat";
import React from "react";
import HorizontalSlider from "../../components/horizontal-slider/horizontalSlider";
import "./pokemonSearchView.scss"



const PokemonSearchView = () => (
  <Container fluid className={"full-screen pokemon-search-view"}>
    <Row className={"content"}>
      <HorizontalSlider/>
      <HorizontalSlider/>
    </Row>

    <Row className={"footer"}>
      <Col xs={6}>
        <Chat/>
      </Col>
    </Row>
  </Container>
);

export default PokemonSearchView;