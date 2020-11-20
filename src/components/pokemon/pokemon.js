import React from "react";
import {getPokemonInfo} from "../../utils/pokedex";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./pokemon.scss"

const Pokemon = ({id}) => {
  const [info, setInfo] = React.useState("")

  React.useEffect(() => {
    getPokemonInfo(id)
      .then(setInfo)
  }, [id])

  return (
    <div className={"pokemon"}>
      <img
        src={"https://www.clker.com/cliparts/H/i/N/a/u/y/ilmenskie-flying-platform-md.png"}
        className={"platform"}
      />

      {id
        ? <img
          alt={`picture of ${info.name} pokemon`}
          className={"avatar"}
          src={info.image}
        />

        :
          <FontAwesomeIcon
            className="icon"
            icon="plus-square"
          />
      }
    </div>
  )
};

export default Pokemon