import React from "react";

import "./horizontalSlider.scss"
import Pokemon from "../pokemon/pokemon";


const pokemonList = [20, 12, 10, 30, 5, 40, 37, 23, 12, 43, 32]

const HorizontalSlider = () => {
  const [pos, setPos] = React.useState(0)
  const slider = React.useRef(null)

  return (
    <div className='horizontal-slider'
         ref={slider}

         onMouseDown={event => {
           event.preventDefault()

           const onMouseMove = event => setPos(prev => prev + parseInt(event.movementX));
           const removeListeners = event => {
             slider.current.removeEventListener("mousemove", onMouseMove)
             slider.current.removeEventListener("mouseleave", removeListeners)
             slider.current.removeEventListener("mouseup", removeListeners)
           }

           slider.current.addEventListener("mouseup", removeListeners)
           slider.current.addEventListener("mouseleave", removeListeners)

           slider.current.addEventListener("mousemove", onMouseMove)
         }}
    >
      <ul className='slider'
          style={{
            transform: `translateX(${pos}px)`
          }}
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
