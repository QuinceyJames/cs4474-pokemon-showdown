import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chat from "../../components/chat/chat";
import React from "react";
import Pokemon from "../../components/pokemon/pokemon";
import PokemonTrainer from "../../components/pokemon-trainer/pokemonTrainer";

const pokemonList = [20, 12, 0, 30, 5, 40]

const PokemonTeam = () => {
  return (
    <Row className={"justify-content-center"}>
      <Col xs={12} sm={11} md={10} lg={9} xl={7} className={"d-flex align-items-end justify-content-center"}>

        <div className={"d-flex flex-nowrap position-absolute align-items-end"}>{
          pokemonList.map((id, index) => {
            const x = Math.abs(index - ((pokemonList.length - 1) / 2))
            const curve = Math.sin(((Math.PI * x) / pokemonList.length) - Math.PI)
            const transformed = 80 * Math.pow(curve, 2)

            return (
              <Col style={{marginBottom: transformed}} key={index} className={"px-0"}>
                <Pokemon id={id}/>
              </Col>
            )
          })
        }</div>
      </Col>
    </Row>
  )
}

const PokemonSearchView = () => (
  <Container fluid className={"full-screen"}>
    <Row className={"content"}>
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