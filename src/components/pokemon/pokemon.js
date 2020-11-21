import React from "react";
import {getPokemonInfo} from "../../utils/pokedex";
import "./pokemon.scss"

const Pokemon = ({id, avatar = true, icon = true, platform = true, animate = true, highlight = true}) => {
  const [info, setInfo] = React.useState("")
  const [isHovering, setIsHovering] = React.useState("")

  React.useEffect(() => {
    getPokemonInfo(id)
      .then(setInfo)
  }, [id])

  return (
    <div
      className={`pokemon ${highlight ? "highlight" : ""}`}
      onMouseEnter={() => setIsHovering(animate && "animate")}
      onAnimationEnd={() => setIsHovering("")}
    >
      {platform ? <img
        alt={"pokemon trainer"}
        src={"https://www.clker.com/cliparts/H/i/N/a/u/y/ilmenskie-flying-platform-md.png"}
        className={`platform`}
      /> : undefined}

      {id && avatar ? <img
        alt={`${info.name} pokemon`}
        className={`avatar ${isHovering}`}
        src={info.image}
      /> : undefined}

      {!id && icon ? <img
        alt={"add pokemon"}
        className={`icon ${isHovering}`}
        src={"plus-square-solid.png"}
      /> : undefined}
    </div>
  )
};

export default Pokemon