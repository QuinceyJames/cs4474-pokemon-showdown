import Row from "react-bootstrap/Row";
import React from "react";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import Pokemon from "../../components/pokemon/pokemon";
import {connect} from "react-redux";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";
import Button from "../../components/button/button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {getItemCategories, getPokemonByType, getPokemonTypes} from "../../utils/pokedex";
import "./pokemonSearchView.scss"
import PokemonCard from "../../components/pokemon-card/pokemonCard";

const PokemonTypeList = ({type}) => {
  const [pokemonList, setPokemonList] = React.useState([])

  React.useEffect(() => {
    getPokemonByType(type)
      .then(({pokemon}) => setPokemonList(pokemon.map(({pokemon}) => pokemon.name).slice(0, 15)))
  }, [type])

  return <PokemonFileFolder children={pokemonList.map((id, key) =>
    <PokemonCard key={key} id={id}/>
  )}/>
}

const TabMapper = ({children}) => {
  const [fileFolderIndex, setFileFolderIndex] = React.useState(0);

  return <Tabs activeKey={fileFolderIndex} onSelect={setFileFolderIndex} mountOnEnter unmountOnExit>
    {children.map((child, key) =>
      <Tab title={child.props.type} eventKey={key} key={key}>
        {child}
      </Tab>
    )}
  </Tabs>
}

const PokemonSearchView = ({openTeamBuilder, activePokemon}) => {
  const [pokemonTypes, setPokemonTypes] = React.useState([]);
  const [itemCategories, setItemCategories] = React.useState([]);


  React.useEffect(() => {
    getPokemonTypes()
      .then(({results}) => setPokemonTypes(results))
    getItemCategories()
      .then(({results}) => setItemCategories(results))
  }, [])

  return (
    <Row className="pokemon-search-view">

      <div className="pokemon-preview">
        <Pokemon avatar id={activePokemon?.id} icon platform/>
      </div>

      <Button onClick={() => openTeamBuilder()}>Save</Button>

      <TabMapper children={pokemonTypes.map(({name}, key) =>
        <PokemonTypeList key={key} type={name}/>
      )}/>

    </Row>
  );
}

const mapDispatchToProps = {openTeamBuilder}
const mapStateToProps = ({appState: {activePokemon}}) => ({activePokemon})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonSearchView);