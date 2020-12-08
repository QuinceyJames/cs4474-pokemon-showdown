import Row from "react-bootstrap/Row";
import React from "react";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import Pokemon from "../../components/pokemon/pokemon";
import {connect} from "react-redux";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";
import Button from "../../components/button/button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {getPokemonTypes} from "../../utils/pokedex";
import "./pokemonSearchView.scss"

const TabMapper = ({elements}) => {
  const [fileFolderIndex, setFileFolderIndex] = React.useState(0);

  return <Tabs activeKey={fileFolderIndex} onSelect={setFileFolderIndex} mountOnEnter unmountOnExit>
    {elements.map((child, key) =>
      <Tab title={child.props.type} eventKey={key} key={key}>
        {child}
      </Tab>
    )}
  </Tabs>
}

const PokemonSearchView = ({openTeamBuilder, activePokemon}) => {
  const [pokemonTypes, setPokemonTypes] = React.useState([]);

  React.useEffect(() => {
    getPokemonTypes()
      .then(({results}) => setPokemonTypes(results))
  }, [])

  console.log(pokemonTypes)
  return (
    <Row className="pokemon-search-view">

      <div className="pokemon-preview">
        <Pokemon avatar id={activePokemon?.id} icon platform/>
      </div>

      <Button onClick={() => openTeamBuilder()}>Save</Button>


      <TabMapper elements={pokemonTypes.map(({name}) =>
        <PokemonFileFolder type={name}/>
      )}/>

      {/*<TabMapper elements={pokemonTypes.map(({name}) =>*/}
      {/*  <PokemonFileFolder type={name}/>*/}
      {/*)}/>*/}

    </Row>
  );
}

const mapDispatchToProps = {openTeamBuilder}
const mapStateToProps = ({appState: {activePokemon}}) => ({activePokemon})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonSearchView);