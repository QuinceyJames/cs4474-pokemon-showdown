import React from "react";
import {getPokemonInfo} from "../../utils/pokedex";
import "./pokemon.scss"

const Pokemon = ({pokemon, avatar, icon, platform, animate, highlight, label, item}) => {
  const name = pokemon?.name;
  const [info, setInfo] = React.useState("")
  const [isHovering, setIsHovering] = React.useState("")

  React.useEffect(() => {
    getPokemonInfo(name)
      .then(setInfo)
  }, [name])

  return (
    <div
      className={`pokemon ${highlight ? "highlight" : ""}`}
      onMouseEnter={() => setIsHovering(animate && "animate")}
      onAnimationEnd={() => setIsHovering("")}
    >

      {label
        ? <h3 className={`name`}>{name}</h3>
        : undefined
      }

      {platform ? <img
        alt={"pokemon trainer"}
        src={"https://www.clker.com/cliparts/H/i/N/a/u/y/ilmenskie-flying-platform-md.png"}
        className={`platform`}
      /> : undefined}


      {name && avatar && info ? <img
        alt={`${name} pokemon`}
        className={`avatar ${isHovering}`}
        src={info?.image}
      /> : undefined}

      {!name && icon ? <img
        alt={"add pokemon"}
        className={`icon ${isHovering}`}
        src={"plus-square-solid.png"}
      /> : undefined}


      {item && pokemon.typeImage ? <img
        alt={"pokemon item"}
        src={pokemon.typeImage}
        className={"item"}
      /> : undefined}
    </div>
  )
};

export default Pokemon