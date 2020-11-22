import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chat from "../../components/chat/chat";
import React from "react";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import "./pokemonSearchView.scss"
import Pokemon from "../../components/pokemon/pokemon";


const PokemonSearchView = () => (
  <Container fluid className={"full-screen pokemon-search-view"}>
    <Row className={"content"}>
      <Col xs={12}>
        <Pokemon avatar/>
      </Col>
      <PokemonFileFolder/>
      <PokemonFileFolder/>
      <PokemonFileFolder/>
    </Row>

    <Row className={"footer"}>
      <Col xs={6}>
        <Chat/>
      </Col>
    </Row>
  </Container>
);

export default PokemonSearchView;