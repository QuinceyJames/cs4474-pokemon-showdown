import React from "react";

import "./pokemonFileFolder.scss"


const PokemonFileFolder = ({children}) => {
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
          {children}
        </ul>
      </div>
    </div>
  );
}

export default PokemonFileFolder;
