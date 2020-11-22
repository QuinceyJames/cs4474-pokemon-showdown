import React from "react";

import "./horizontalSlider.scss"
import Pokemon from "../pokemon/pokemon";


const pokemonList = [20, 12, 10, 30, 5, 40, 37, 23, 12, 43, 32]

const HorizontalSlider = () => {
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
    <div className='horizontal-slider'
         ref={container}

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
        {pokemonList.map((id, i) =>
          <li key={i}>
            <div className='front'>
              <Pokemon id={id} avatar name/>
            </div>

            <div className='back'>
              fasldkfj sldkfj l;askdjf a;lskdjf lskdjfklajssdh flkjashd fkljhashd fkljashd lkfjhaskdl fjash dkf
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}


export default HorizontalSlider
