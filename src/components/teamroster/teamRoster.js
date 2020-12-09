import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../../components/button/button";
import React, {Children} from "react";
import PokemonTrainer from "../../components/pokemon-trainer/pokemonTrainer";
import Pokemon from "../../components/pokemon/pokemon";
import "./teamRoster.scss"
import {connect} from "react-redux";
import openEditView from "../../features/app-state/actions/openEditView";
import openBattlePage from "../../features/app-state/actions/openBattlePage";
import PokemonFileFolder from "../pokemon-file-folder/pokemonFileFolder";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";


const TeamRoster = ({openTeamBuilder, activePokemon, pokemonList}) => {
    console.log(activePokemon)
    return (
        <Row className={"justify-content-left"}>
            <Col xs={12} sm={11} md={10} lg={9} xl={7} className={"d-flex align-items-end justify-content-right"}>
    <div className={"d-flex-teamRoster flex-nowrap position-absolute align-items-end"}>{
        pokemonList.map(({id}, index) => {
            const x = Math.abs(index - ((pokemonList.length - 1) / 2))
            const curve = Math.sin(((Math.PI * x) / pokemonList.length) - Math.PI)
            const transformed = 80 * Math.pow(curve, 2)

            return (
                <Col
                    style={{marginBottom: transformed}}
                    key={index} className={"px-1"}
                    onClick={() => openEditView(index)}
                >
                    <Pokemon id={id} avatar platform animate highlight icon/>
                </Col>
            )
        })
    }</div>
            </Col>
        </Row>
    )
}

const mapDispatchToProps = {openTeamBuilder, openEditView}
const mapStateToProps = ({appState: {pokemonList}}) => ({pokemonList})
export default connect(mapStateToProps, mapDispatchToProps)(TeamRoster);

