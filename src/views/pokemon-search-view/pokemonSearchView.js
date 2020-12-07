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
import {getPokemonTypes} from "../../utils/pokedex";

const PokemonSearchView = ({openTeamBuilder, activePokemon}) => {
  const [fileFolderIndex, setFileFolderIndex] = React.useState(0);
  const [pokemonTypes, setPokemonTypes] = React.useState([]);

  React.useEffect(() => {
    getPokemonTypes()
      .then(({results}) => setPokemonTypes(results))
  }, [])

  console.log({activePokemon})

  return (
    <Row className="pokemon-search-view">

      <div className="pokemon-preview">
        <Pokemon avatar id={activePokemon?.id} icon platform/>
      </div>

      <Button onClick={() => openTeamBuilder()}>Save</Button>

      <Tabs activeKey={fileFolderIndex} onSelect={setFileFolderIndex} unmountOnExit mountOnEnter>
        {pokemonTypes.map(({name, url}, key) => (
          <Tab title={name} eventKey={key} key={key} className={`pokemon-type-${name}`} tabClassName={`pokemon-type-${name}`}>
            <PokemonFileFolder type={name}/>
          </Tab>
        ))}
      </Tabs>
    </Row>
  );
}

const mapDispatchToProps = {openTeamBuilder}
const mapStateToProps = ({appState: {activePokemon}}) => ({activePokemon})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonSearchView);