import React from "react";
import {getPokemonDescription} from "../../utils/pokedex";
import Pokemon from "../../components/pokemon/pokemon";
import Button from "../../components/button/button";
import {connect} from "react-redux";
import setActivePokemon from "../../features/app-state/actions/setActivePokemon";

function isPokemonDisabled(candidateID, activeID, activePokemonList) {
  const teamIDs = activePokemonList.map(({id}) => id)

  if (candidateID === activeID) {
    return false;
  } else if (teamIDs.includes(candidateID)) {
    return true;
  } else {
    return false;
  }
}

const PokemonCard = ({id, dragging, activePokemon, activePokemonList, setActivePokemon}) => {
  const [expand, setExpand] = React.useState({pre: false, post: false});
  const [description, setDescription] = React.useState("");
  const disabled = isPokemonDisabled(id, activePokemon?.id, activePokemonList)
  const isSelected = activePokemon.id === id;

  React.useEffect(() => setExpand({pre: false, post: false}), [dragging])

  React.useEffect(() => {
    getPokemonDescription(id)
      .then(setDescription)
  }, [id])

  return (
    <li
      onMouseDown={() => setExpand(({pre, post}) => ({pre: true, post: post}))}
      onClick={() => {
        setExpand(({pre, post}) => {
          return ({pre: false, post: !post && pre})
        })
      }}
      onMouseLeave={() => setExpand({pre: false, post: false})}
      className={`${expand.post ? "expand" : ""} ${dragging} ${disabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`}
    >
      <div className='front'>
        <Pokemon id={id} avatar name/>
      </div>

      <div className='back'>
        <div className="description">
          {description}
        </div>

        <Button onClick={() => disabled || setActivePokemon({id})}>Pick Me!</Button>
      </div>
    </li>
  )
}

const mapDispatchToProps = {setActivePokemon}
const mapStateToProps = ({appState: {activePokemonList, activePokemon}}) => ({activePokemonList, activePokemon})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonCard);