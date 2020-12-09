import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Challenges from "../../components/challenges/challenges";
import Ladder from "../../components/ladder/ladder";
import Button from "../../components/button/button";
import React from "react";
import PokemonTrainer from "../../components/pokemon-trainer/pokemonTrainer";
import Pokemon from "../../components/pokemon/pokemon";
import "./battlePage.scss"



const PokemonBattlePage = () => {
  return (
    <Row className={"justify-content-center"}>
      {/*<Col xs={12} sm={11} md={10} lg={9} xl={7} className={"d-flex align-items-end justify-content-center"}>*/}
      {/*  <PokemonTrainer height={400}/>*/}

      {/*  <div className={"d-flex flex-nowrap position-absolute align-items-end"}>{*/}
      {/*    pokemonList.map((id, index) => {*/}
      {/*      const x = Math.abs(index - ((pokemonList.length - 1) / 2))*/}
      {/*      const curve = Math.sin(((Math.PI * x) / pokemonList.length) - Math.PI)*/}
      {/*      const transformed = 80 * Math.pow(curve, 2)*/}
            return (
              <Col style={{marginBottom: transformed}} key={index} className={"px-1"}>
                <Pokemon id={id} avatar platform animate highlight icon/>
              </Col>
            )

            return (
            <Col style={{marginBottom: transformed}} key={index} className={"px-1"}>
                <Pokemon id={id} avatar platform animate highlight icon/>
            </Col>
        )
          })
      {/*  }</div>*/}
      {/*</Col>*/}
    </Row>
  )
}

const BattlePage = () => (
  <Row className={"team-builder-view"}>
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

    <Row className="d-flex justify-content-end">
      <Col xs={4} md={3} xl={2}>
        <Button color="blue">Solos</Button>
        <Button type="inverse" color="yellow" height={100}>Play</Button>
      </Col>
    </Row>
  </Row>
);

export default BattlePage;