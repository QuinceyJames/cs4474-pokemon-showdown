import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Challenges from "../../components/challenges";
import Ladder from "../../components/ladder";
import Chat from "../../components/chat";
import PokemonTrainer from "../../components/pokemon-trainer";
import Pokemon from "../../components/pokemon";
import "./style.css"
import Button from "../../components/button";
import Container from "react-bootstrap/Container";

const pokemonList = [20, 2, 0, 0, 5, 0]

const PokemonTeam = () => {
  return (
    <Row className={"justify-content-center"}>
      <Col xs={12} sm={11} md={10} lg={9} xl={7} className={"d-flex align-items-end justify-content-center"}>
        <PokemonTrainer height={400}/>

        <div className={"d-flex flex-nowrap position-absolute align-items-end"}>{
          pokemonList.map((id, index) => {
            const x = Math.abs(index - ((pokemonList.length - 1) / 2))
            const curve = Math.sin(((Math.PI * x) / pokemonList.length) - Math.PI)
            const transformed = 80 * Math.pow(curve, 2)

            return (
              <Col style={{marginBottom: transformed}} className={"px-0"}>
                <Pokemon id={id}/>
              </Col>
            )
          })
        }</div>
      </Col>
    </Row>
  )
}

function TeamBuilderView() {
  return (
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

        <PokemonTeam/>

        <Row>
          <Col xs={4}>
            <Col xs={12}>
              <Button>Solos</Button>
            </Col>
            <Col xs={12}>
              <Button>Play</Button>
            </Col>
          </Col>
        </Row>
      </Row>

      <Row className={"footer"}>
        <Col xs={5}>
          <Chat/>
        </Col>
      </Row>
    </Container>
  )
}

export default TeamBuilderView;
