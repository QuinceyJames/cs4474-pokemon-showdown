import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Challenges from "../../components/challenges/challenges";
import Ladder from "../../components/ladder/ladder";
import Button from "../../components/button/button";
import React, { Children } from "react";
import PokemonTrainer from "../../components/pokemon-trainer/pokemonTrainer";
import Pokemon from "../../components/pokemon/pokemon";
import openEditView from "../../features/app-state/actions/openEditView";
import "./battlePage.scss";
import { connect } from "react-redux";
import teamBuilderView from "../team-builder-view/teamBuilderView";
import TeamBuilderView from "../team-builder-view/teamBuilderView";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import TeamRoster from "../../components/teamroster/teamRoster";
import PokemonTrainer2 from "../../components/pokemon-trainer-2/pokemonTrainer2";
import PokemonTrainerBattle from "../../components/pokemon-trainer-battle/pokemonTrainerBattle";
import AttackButton from "../../components/attack-button/attack-button";
import openBattlePage from "../../features/app-state/actions/openBattlePage";
import PokemonTeam from "../../components/pokemon-team/pokemonTeam";

// const BattlePage = ({pokemonList, activePokemon, openEditView}) => {
//     console.log(activePokemon)
//     return (
//         <Row className={"team-builder-view"}>
//             <Row className={"justify-content-center"}>
//                 <Col xs={12} sm={11} md={10} lg={9} xl={7} className={"d-flex align-items-end justify-content-center"}>
//                     <TeamBuilderView/>
//                 </Col>
//             </Row>
//
//             <Row className="d-flex justify-content-end">
//                 <Col xs={4} md={3} xl={2}>
//                     <Button backgroundColor="blue">Switch</Button>
//                     <Button backgroundColor="red">Attack</Button>
//                 </Col>
//             </Row>
//         </Row>
//     );
// }

const BattlePage = ({ openTeamBuilder, activePokemon, openEditView }) => {
  return (
    <>
      <Row className={"pokemon-trainer-2"}>
        <Col className={"d-flex align-items-end justify-content-right"}>
          <PokemonTrainer2 />
        </Col>
        <Col className={"d-flex align-items-end justify-content-right"}>
          <PokemonTeam pokemonList={[1, 2, 3, 4, 5, 6]} />
        </Col>
      </Row>
      <Row className={"pokemon-trainer-1"}>
        <Col
          id={"trainer"}
          className={"d-flex align-items-end justify-content-start"}
        >
          <PokemonTrainerBattle />
        </Col>
        <Col className={"d-flex align-items-end justify-content-right"}>
          <AttackButton
            attackName="Vine Whip"
            attackType="grass"
            targetType="fire"
            onclick={() =>
              document.getElementById("trainer").classList.add("attack")
            }
            onclick={() =>
              console.log(document.getElementById("trainer").classList)
            }
          ></AttackButton>
        </Col>
      </Row>
      <Row
        className={
          "pokemon-trainer-1-pokemon .pokemon-battle > *.platform + .icon {"
        }
      >
        <Col className={"align-items-end justify-content-start"}>
          <TeamRoster />
        </Col>
      </Row>
    </>
  );
};

const mapDispatchToProps = { openEditView };
const mapStateToProps = ({ appState }) => ({ ...appState });
export default connect(mapStateToProps, mapDispatchToProps)(BattlePage);
