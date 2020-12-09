import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {Children} from "react";
import "./challengesView.scss"
import {connect} from "react-redux";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";
import Button from "../../components/button/button";
import { Container } from "react-bootstrap";
import openLadderView from "../../features/app-state/actions/openLadderView";



const LadderView = ({openTeamBuilder,openLadderView}) => {
  return (

        <Row >
        <Col xs={5} md={4} xl={3} >
            <Button onClick={()=>openTeamBuilder()} backgroundColor="#546BAB">
                <img className="logoIcon" src="https://vignette.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest/scale-to-width-down/340?cb=20140520015336" ></img>
                    Home
            </Button>
            <Button onClick= {()=>openTeamBuilder()} backgroundColor="purple">
            <img className="logoIcon" src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Totodile.png" ></img>
            Challenges</Button>
            
            <Button onClick={()=>openLadderView()} backgroundColor="pink" color="black">Ladder</Button>

                

        </Col>
        <Col >
          <Button backgroundColor="gold" color="black">
              <div>Beat an opponent without losing a pokemon </div>&nbsp; &nbsp; 100 points</Button>
          <Button backgroundColor="gold" color="black"><div>Win a match without getting critical hit</div> &nbsp; &nbsp; 75 points</Button>
          <Button backgroundColor="gold" color="black"> <div>Win a match without using an attacking move</div>  &nbsp; &nbsp; 75 points</Button>
          <Button backgroundColor="silver" color="black"><div>Win with your last pokemon having less than 50% HP</div> &nbsp;  &nbsp; 25 points</Button>
          <Button backgroundColor="silver" color="black"><div>Beat your opponent in under 2 minutes</div>   &nbsp; &nbsp;25 points</Button>
          <Button backgroundColor="#cd7f32" color="black"><div>Log on for 2 days</div> &nbsp;  &nbsp; 10 points</Button>
          <Button backgroundColor="#cd7f32" color="black"><div>Talk to your opponent</div> &nbsp;  &nbsp; 5 points</Button>
          <Button backgroundColor="#cd7f32" color="black"><div>Build a team</div> &nbsp;  &nbsp; 5 points</Button>
        </Col>
        </Row>

  );
}

const mapDispatchToProps = {openTeamBuilder,openLadderView}
const mapStateToProps = ({appState}) => ({...appState})
export default connect(mapStateToProps, mapDispatchToProps)(LadderView);