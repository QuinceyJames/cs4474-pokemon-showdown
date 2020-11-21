import React from "react";
import {getPokemonInfo} from "../../utils/pokedex";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./pokemon.scss"

const Pokemon = ({id}) => {
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
      <img
        src={"https://www.clker.com/cliparts/H/i/N/a/u/y/ilmenskie-flying-platform-md.png"}
        className={"platform"}
      />

      {id

        ? <img
          alt={`${info.name} pokemon`}
          className={`avatar ${isHovering}`}
          src={info.image}
        />

        : <FontAwesomeIcon
          className={`icon ${isHovering}`}
          icon="plus-square"
        />
      }
    </div>
  )
};

export default Pokemon