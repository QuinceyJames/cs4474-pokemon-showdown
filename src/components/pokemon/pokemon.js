import React from "react";
import {getPokemonInfo} from "../../utils/pokedex";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./pokemon.scss"

const Pokemon = ({id, avatar = true, icon = true, platform = true}) => {
  const [info, setInfo] = React.useState("")
  const [isHovering, setIsHovering] = React.useState("")

  React.useEffect(() => {
    getPokemonInfo(id)
      .then(setInfo)
  }, [id])

  return (
    <div
      className={`pokemon`}
      onMouseEnter={() => setIsHovering("isHovering")}
      onAnimationEnd={() => setIsHovering("")}
    >
      {platform ? <img
        src={"https://www.clker.com/cliparts/H/i/N/a/u/y/ilmenskie-flying-platform-md.png"}
        className={"platform"}
      /> : undefined}

      {id && avatar ? <img
        alt={`${info.name} pokemon`}
        className={`avatar ${isHovering}`}
        src={info.image}
      /> : undefined}

      {!id && icon ? <FontAwesomeIcon
        className={`icon ${isHovering}`}
        icon="plus-square"
      /> : undefined}
    </div>
  )
};

export default Pokemon