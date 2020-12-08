import React from "react";

import "./pokemonFileFolder.scss"
import Pokemon from "../pokemon/pokemon";
import {connect} from "react-redux";
import setActivePokemon from "../../features/app-state/actions/setActivePokemon";
import {getPokemonByType, getPokemonDescription} from "../../utils/pokedex";
import Button from "../button/button";

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

const PokemonCard = ({id, dragging, disabled, onClick, isSelected}) => {
  const [expand, setExpand] = React.useState({pre: false, post: false});
  const [description, setDescription] = React.useState("");

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

        <Button onClick={() => onClick && onClick()}>Pick Me!</Button>
      </div>
    </li>
  )
}

const PokemonFileFolder = ({type, activePokemon, activePokemonList, setActivePokemon}) => {
  const [pokemonList, setPokemonList] = React.useState([])
  const [pos, setPos] = React.useState(0)
  const [dragging, setDragging] = React.useState("")
  const container = React.useRef(null)
  const slider = React.useRef(null)

  const getBoundedPos = (pos) => {
    const containerSize = container.current.clientWidth;
    const fullWidth = slider.current.clientWidth;
    const range = containerSize - fullWidth

    return Math.min(Math.max(pos, range), 0)
  }

  React.useEffect(() => {
    getPokemonByType(type)
      .then(({pokemon}) => setPokemonList(pokemon.map(({pokemon}) => pokemon.name).slice(0, 15)))
  }, [type])

  console.log({pokemonList})

  return (
    <div className='pokemon-file-folder'>
      <div className='file-folder-contents'
           ref={container}

        // TODO: Handle bug on window resize

           onMouseDown={event => {
             event.preventDefault()

             const onMouseMove = event => {
               setDragging("dragging")
               setPos(prev => prev + parseInt(event.movementX));
             }

             const removeListeners = event => {
               setDragging("")
               setPos(nextPos => {
                 container.current.removeEventListener("mousemove", onMouseMove)
                 container.current.removeEventListener("mouseleave", removeListeners)
                 container.current.removeEventListener("mouseup", removeListeners)

                 return getBoundedPos(nextPos)
               })
             }

             container.current.addEventListener("mouseup", removeListeners)
             container.current.addEventListener("mouseleave", removeListeners)

             container.current.addEventListener("mousemove", onMouseMove)
           }}
      >
        <ul className={`slider ${dragging}`}
            ref={slider}
            style={{transform: `translateX(${pos}px)`}}
        >
          {pokemonList.map((candidateID, key) => {
            const disabled = isPokemonDisabled(candidateID, activePokemon?.id, activePokemonList)

            return <PokemonCard
              key={key}
              id={candidateID}
              dragging={dragging}
              onClick={() => disabled || setActivePokemon({id: candidateID})}
              disabled={disabled}
              isSelected={activePokemon.id === candidateID}
            />
          })}
        </ul>
      </div>
    </div>
  );
}

const mapDispatchToProps = {setActivePokemon}
const mapStateToProps = ({appState: {activePokemonList, activePokemon}}) => ({activePokemonList, activePokemon})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonFileFolder);
