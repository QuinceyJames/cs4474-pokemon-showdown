import Row from "react-bootstrap/Row";
import React from "react";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import Pokemon from "../../components/pokemon/pokemon";
import {connect} from "react-redux";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";
import Button from "../../components/button/button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {
  getItemByName,
  getItemCategories,
  getItemCategoryByName, getMoveByName,
  getMoveCategoriesList, getMoveDescription,
  getPokemonByType,
  getPokemonDescription,
  getPokemonInfo,
  getPokemonTypes
} from "../../utils/pokedex";
import "./pokemonSearchView.scss"
import PokemonCard from "../../components/pokemon-card/pokemonCard";
import setActivePokemon from "../../features/app-state/actions/setActivePokemon";
import Col from "react-bootstrap/Col";

const mapDispatchToProps = {openTeamBuilder, setActivePokemon}
const mapStateToProps = ({appState: {activePokemon}}) => ({activePokemon})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)

const TypeDescription = connectComponent(({pokemon: {type}, setActivePokemon}) => {
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    getItemByName(type)
      .then(setDescription)
  }, [type])
  return <>
    <div className='front'>
      <img style={{width: "100%"}} src={description?.sprites?.default}/>
    </div>
    <div className='back'>
      <div className="description">
        {description["flavor_text_entries"]?.find(x => x.language.name === "en")["text"]}

      </div>
      <Button onClick={() => setActivePokemon({type: type, typeImage: description?.sprites?.default})}>Pick
        Me!</Button>
    </div>
  </>
})

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

const MoveDescription = ({name}) => {
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    getMoveDescription(name)
      .then(setDescription)
  }, [name])

  console.log({description})

  return <div className="description">
    {description}
  </div>
}


const PokemonTypeList = connectComponent(({name, setActivePokemon}) => {
  const [pokemonList, setPokemonList] = React.useState([])

  React.useEffect(() => {
    getPokemonByType(name)
      .then(({pokemon}) => setPokemonList(pokemon.map(({pokemon}) => pokemon).slice(0, 15)))
  }, [name])

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

const PokemonMoveList = connectComponent(({setActivePokemon, activePokemon}) => {
  const [moveList, setMoveList] = React.useState([])

  React.useEffect(() => {
    getPokemonInfo(activePokemon?.name)
      .then(({moves}) => moves.map(({move}) => move))
      .then(setMoveList)
  }, [activePokemon])

  // React.useEffect(() => {
  //   getPokemonByType(name)
  //     .then(({pokemon}) => setPokemonList(pokemon.map(({pokemon}) => pokemon).slice(0, 15)))
  // }, [name])

  console.log({moveList})
  return <PokemonFileFolder children={moveList.map(({name}, key) =>
    <PokemonCard key={key} pokemon={{name}}>
      <div className='front'>
      </div>

      <div className='back'>

        <MoveDescription name={name}/>
        <Button>Pick Me!</Button>
      </div>
    </PokemonCard>
  )}/>
})

const PokemonItemList = ({name}) => {
  const [itemList, setItemList] = React.useState([])

  React.useEffect(() => {
    getItemCategoryByName(name)
      .then(({items}) => {
        setItemList(items);
      })
  }, [name])

  return <PokemonFileFolder children={itemList.map(({name}, key) =>
    <PokemonCard key={key} pokemon={{name}}>
      <TypeDescription pokemon={{type: name}}/>
    </PokemonCard>
  )}/>
}

const TabMapper = ({children}) => {
  const [fileFolderIndex, setFileFolderIndex] = React.useState(0);

  return <Tabs activeKey={fileFolderIndex} onSelect={setFileFolderIndex} mountOnEnter unmountOnExit>
    {children.map((child, key) =>
      <Tab title={child.props.name} eventKey={key} key={key}>
        {child}
      </Tab>
    )}
  </Tabs>
}

const PokemonSearchView = ({openTeamBuilder, activePokemon}) => {
  const [pokemonTypes, setPokemonTypes] = React.useState([]);
  const [pokemonMoves, setPokemonMoves] = React.useState([]);
  const [itemCategories, setItemCategories] = React.useState([]);
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    getPokemonTypes()
      .then(({results}) => setPokemonTypes(results))
    getItemCategories()
      .then(({results}) => setItemCategories(results.slice(0, 20)))
    getMoveCategoriesList()
      .then(({results}) => setPokemonMoves(results.slice(0, 20)))
  }, [])

  console.log({step, activePokemon, pokemonMoves})

  function next() {
    setStep(old => {
      if (old === 0 && activePokemon.name) {
        return 1;
      } else if (old === 1 && activePokemon.type) {
        return 2;
      } else if (old === 2) {
        openTeamBuilder()
        return 0
      } else {
        return old;
      }
    })
  }

  function prev() {
    setStep(old => {
      if (old === 1) {
        return 0;
      } else if (old === 2) {
        return 1
      } else {
        return old;
      }
    })
  }

  return (
    <Row className="pokemon-search-view">
      <Row className="pokemon-preview">
        <Col xs={3}>
          {step === 0 ? undefined : <Button height={80} onClick={() => prev()}>Previous</Button>}
        </Col>

        <Col xs={3}>
          <Pokemon pokemon={activePokemon} avatar icon item platform/>
        </Col>

        <Col xs={3}>
          <Button height={80} onClick={() => next()}>Next</Button>
        </Col>
      </Row>


      {step === 0
        ? <TabMapper children={pokemonTypes.map(({name}, key) =>
          <PokemonTypeList key={key} name={name}/>
        )}/>
        : undefined
      }

      {step === 1
        ? <TabMapper children={itemCategories.map(({name}, key) =>
          <PokemonItemList key={key} name={name}/>
        )}/>
        : undefined
      }

      {step === 2
        ? <TabMapper children={pokemonMoves.map(({name}, key) =>
          <PokemonMoveList key={key}/>
        )}/>
        : undefined
      }
    </Row>
  );
}


export default connectComponent(PokemonSearchView);