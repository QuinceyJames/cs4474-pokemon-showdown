import React from "react";

import "./pokemonFileFolder.scss"
import Pokemon from "../pokemon/pokemon";


const pokemonList = [20, 12, 10, 30, 5, 40, 37, 23, 12, 43, 32]

const PokemonCard = ({id, dragging}) => {
  const [expand, setExpand] = React.useState({pre: false, post: false});

  React.useEffect(() =>
    setExpand(
      {pre: false, post: false}
    ), [dragging]
  )

  return (
    <li
      onMouseDown={() =>
        setExpand(
          ({pre, post}) => ({pre: true, post: post})
        )
      }

      onClick={() =>
        setExpand(
          ({pre, post}) => ({pre: false, post: !post && pre})
        )
      }

      onMouseLeave={() =>
        setExpand(
          {pre: false, post: false}
        )
      }

      className={
        `${expand.post ? "expand" : ""} ${dragging}`
      }
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

const PokemonFileFolder = ({title}) => {
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

  return (
    <div className='pokemon-file-folder'>

      <div className="file-folder-tab">
        {title || "Title"}
      </div>

      <div className='file-folder-contents'
           ref={container}

        // TODO: Handle bug on window resize

           onMouseDown={event => {
             event.preventDefault()

             container.current.addEventListener("mouseup", removeListeners)
             container.current.addEventListener("mouseleave", removeListeners)

             container.current.addEventListener("mousemove", onMouseMove)
           }}
      >
        <ul className={`slider ${dragging}`}
            ref={slider}
            style={{transform: `translateX(${pos}px)`}}
        >
          {pokemonList.map((id, key) =>
            <PokemonCard id={id} key={key} dragging={dragging}/>
          )}
        </ul>
      </div>
    </div>
  );
}


export default PokemonFileFolder
