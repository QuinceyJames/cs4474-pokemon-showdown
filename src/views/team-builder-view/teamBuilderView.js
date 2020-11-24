import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Challenges from "../../components/challenges/challenges";
import Ladder from "../../components/ladder/ladder";
import Button from "../../components/button/button";
import React from "react";
import PokemonTrainer from "../../components/pokemon-trainer/pokemonTrainer";
import Pokemon from "../../components/pokemon/pokemon";
import "./teamBuilderView.scss"

const pokemonList = [20, 12, 0, 30, 5, 40]

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
              <Col style={{marginBottom: transformed}} key={index} className={"px-1"}>
                <Pokemon id={id} avatar platform animate highlight icon/>
              </Col>
            )
          })
        }</div>
      </Col>
    </Row>
  )
}

const TeamBuilderView = () => (
  <Row className={"team-builder-view"}>
    <Row>
      <Col xs={5} md={4} xl={3}>
        <Button backgroundColor="purple">Challenges</Button>
        <Button backgroundColor="pink" color="black">Ladder</Button>
      </Col>
    </Row>

    <PokemonTeam/>

    <Row className="d-flex justify-content-end">
      <Col xs={4} md={3} xl={2}>
        <Button backgroundColor="blue">Solos</Button>
        <Button backgroundColor="red">Play</Button>
      </Col>
    </Row>
  </Row>
);

export default TeamBuilderView;