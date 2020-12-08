import Row from "react-bootstrap/Row";
import React from "react";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import Pokemon from "../../components/pokemon/pokemon";
import {connect} from "react-redux";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";
import Button from "../../components/button/button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {getItemCategories, getPokemonByType, getPokemonDescription, getPokemonTypes} from "../../utils/pokedex";
import "./pokemonSearchView.scss"
import PokemonCard from "../../components/pokemon-card/pokemonCard";
import setActivePokemon from "../../features/app-state/actions/setActivePokemon";

const mapDispatchToProps = {openTeamBuilder, setActivePokemon}
const mapStateToProps = ({appState: {activePokemon}}) => ({activePokemon})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)

const PokemonDescription = ({pokemon: {name}}) => {
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    getPokemonDescription(name)
      .then(setDescription)
  }, [name])

  return <div className="description">
    {description}
  </div>
}


const PokemonTypeList = connectComponent(({type, setActivePokemon}) => {
  const [pokemonList, setPokemonList] = React.useState([])

  React.useEffect(() => {
    getPokemonByType(type)
      .then(({pokemon}) => setPokemonList(pokemon.map(({pokemon}) => pokemon).slice(0, 15)))
  }, [type])

  return <PokemonFileFolder children={pokemonList.map((pokemon, key) =>
    <PokemonCard key={key} pokemon={pokemon}>
      <div className='front'>
        <Pokemon pokemon={pokemon} avatar label/>
      </div>

      <div className='back'>
        <PokemonDescription pokemon={pokemon}/>

        <Button onClick={() => setActivePokemon(pokemon)}>Pick Me!</Button>
      </div>
    </PokemonCard>
  )}/>
})

const PokemonItemList = ({category}) => {
  const [itemList, setItemList] = React.useState([1, 1])

  // React.useEffect(() => {
  //   getPo(type)
  //     .then((pokemon) => setPokemonList(pokemon.map((pokemon) => pokemon).slice(0, 15)))
  // }, [category])

  return <PokemonFileFolder children={itemList.map((id, key) =>
    <PokemonCard key={key} id={id}>
      <div className='front'>
        <Pokemon avatar name/>
      </div>
    </PokemonCard>
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
        <Pokemon pokemon={activePokemon} avatar icon platform/>
      </div>

      <Button onClick={() => openTeamBuilder()}>Save</Button>

      <TabMapper children={pokemonTypes.map(({name}, key) =>
        <PokemonTypeList key={key} type={name}/>
      )}/>

      <TabMapper children={itemCategories.map(({name}, key) =>
        <PokemonItemList key={key} type={name}/>
      )}/>

    </Row>
  );
}


export default connectComponent(PokemonSearchView);