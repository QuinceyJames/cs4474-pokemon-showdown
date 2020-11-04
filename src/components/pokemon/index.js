import React from "react";
import "./style.css"
import {getPokemonInfo} from "../../utils/pokedex";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Platform({}) {
  return (
    <img
      src={"https://www.clker.com/cliparts/H/i/N/a/u/y/ilmenskie-flying-platform-md.png"}
      className={"p-1"}
      style={{
        height: "auto",
        width: "100%",
        objectFit: "contain",
        marginTop: "-25%",
      }}
    />
  )
}


function Pokemon({id, size = 100}) {
  const [info, setInfo] = React.useState("")

  const Avatar = ({}) => {
    switch (id) {
      case 0:
        return (
          <div className="add-pokemon-button">
            <FontAwesomeIcon icon="plus-square" size="lg"/>
          </div>
        )
      default:
        return (
          <img
            className={""}
            src={info.image}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        )
    }
  }

  React.useEffect(() => {
    getPokemonInfo(id)
      .then(setInfo)
  }, [id])

  return (
    <div className={"d-flex flex-column-reverse"}>
      <Platform/>
      <Avatar/>
    </div>
  )
}

export default Pokemon