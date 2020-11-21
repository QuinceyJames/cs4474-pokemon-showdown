import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chat from "../../components/chat/chat";
import React from "react";
import Pokemon from "../../components/pokemon/pokemon";
import "./pokemonSearchView.scss"

const pokemonList = [20, 12, 10, 30, 5, 40]

const PokemonTeam = () => {
  return (
    <Row className="d-flex flex-nowrap">{
      pokemonList.map((id, index) => {

        return (
          <Col xs={2} key={index} className={""}>
            <Pokemon id={id} avatar animate name/>
          </Col>
        )
      })
    }
    </Row>
  )
}

const PokemonSearchView = () => (
  <Container fluid className={"full-screen pokemon-search-view"}>
    <Row className={"content"}>
      <PokemonTeam/>
      <PokemonTeam/>
      <PokemonTeam/>
    </Row>

    <Row className={"footer"}>
      <Col xs={6}>
        <Chat/>
      </Col>
    </Row>
  </Container>
);

export default PokemonSearchView;