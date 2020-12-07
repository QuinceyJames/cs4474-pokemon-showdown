import Row from "react-bootstrap/Row";
import React from "react";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import "./pokemonSearchView.scss"
import Pokemon from "../../components/pokemon/pokemon";
import {connect} from "react-redux";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";
import Button from "../../components/button/button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const pokemonTypes = ["Water Type", "Earth Type", "Air Type"]

const PokemonSearchView = ({openTeamBuilder, activePokemon}) => {
  const [fileFolderIndex, setFileFolderIndex] = React.useState(0);

  return (
    <Row className={"pokemon-search-view"}>

      <div className="pokemon-preview">
        <Pokemon avatar id={activePokemon?.id} icon platform/>
      </div>

      <Button onClick={() => openTeamBuilder()}>Save</Button>


      <Tabs activeKey={fileFolderIndex} onSelect={setFileFolderIndex}>
        {pokemonTypes.map((type, key) => (
          <Tab title={type} eventKey={key} key={key}>
            <PokemonFileFolder/>
          </Tab>
        ))}
      </Tabs>
    </Row>
  );
}

const mapDispatchToProps = {openTeamBuilder}
const mapStateToProps = ({appState: {activePokemon}}) => ({activePokemon})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonSearchView);