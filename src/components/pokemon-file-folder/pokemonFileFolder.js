import React from "react";

import "./pokemonFileFolder.scss"
import Pokemon from "../pokemon/pokemon";
import {connect} from "react-redux";
import setPokemon from "../../features/app-state/actions/setActivePokemon";
import setActivePokemon from "../../features/app-state/actions/setActivePokemon";


const pokemonGroup = [20, 12, 10, 30, 5, 40, 37, 23, 12, 43, 32]

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

const PokemonCard = ({id, dragging, disabled, onClick}) => {
  const [expand, setExpand] = React.useState({pre: false, post: false});

  React.useEffect(() => setExpand({pre: false, post: false}), [dragging])

  return (
    <li
      onMouseDown={() => setExpand(({pre, post}) => ({pre: true, post: post}))}
      onClick={() => {
        onClick && onClick()
        setExpand(({pre, post}) => {
          return ({pre: false, post: !post && pre})
        })
      }}
      onMouseLeave={() => setExpand({pre: false, post: false})}
      className={`${expand.post ? "expand" : ""} ${dragging} ${disabled ? "disabled" : ""}`}
    >
      <div className='front'>
        <Pokemon id={id} avatar name/>
      </div>

      <div className='back'>
        fasldkfj sldkfj l;askdjf a;lskdjf lskdjfklajssdh flkjashd fkljhashd fkljashd lkfjhaskdl fjash dkf
      </div>
    </li>
  )
}

const PokemonFileFolder = ({type, activePokemon, activePokemonList, setActivePokemon}) => {
  const [pokemonList, setPokemonList] = React.useState([1])
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

  }, [type])

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
            />
          })}
        </ul>
      </div>
    </div>
  );
}

const mapDispatchToProps = {setActivePokemon}
const mapStateToProps = ({appState:{activePokemonList, activePokemon}}) => ({activePokemonList, activePokemon})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonFileFolder);
