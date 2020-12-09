import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {Children} from "react";
import "./ladderView.scss"
import {connect} from "react-redux";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";
import Button from "../../components/button/button";
import openChallengesView from "../../features/app-state/actions/openChallengesView";
import { Container } from "react-bootstrap";



const LadderView = ({openTeamBuilder,openChallengesView}) => {
    return (

        <Row >
            <Col xs={5} md={4} xl={3} >
                <Button onClick={()=>openTeamBuilder()} backgroundColor="#546BAB">
                    <img className="logoIcon" src="https://vignette.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest/scale-to-width-down/340?cb=20140520015336" ></img>
                    Home
                </Button>
                <Button onClick={()=>openChallengesView()} backgroundColor="purple">Challenges</Button>
                <Button onClick={()=>openTeamBuilder()} backgroundColor="#FFC0CB" color="black">
                    <img className="logoIcon" src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Totodile.png" ></img>
                    Ladder
                </Button>



            </Col>
            <Col  >
                <Button backgroundColor="#ff748c" color="black">CS Beast</Button>
                <Button backgroundColor="#ffd5dc" color="black">Java Dragon</Button>
                <Button backgroundColor="#ff748c" color="black">Python King</Button>
                <Button backgroundColor="#ffd5dc" color="black">Vue of Death</Button>
                <Button backgroundColor="#ff748c" color="black">Azure Nimbus</Button>
                <Button backgroundColor="#ffd5dc" color="black">Amazon Weather Service</Button>
            </Col>
        </Row>


    );
}

const mapDispatchToProps = {openTeamBuilder,openChallengesView}
const mapStateToProps = ({appState}) => ({...appState})
export default connect(mapStateToProps, mapDispatchToProps)(LadderView);