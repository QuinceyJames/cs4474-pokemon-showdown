import React from "react";
import "./pokemon.scss"
import {getPokemonInfo} from "../../utils/pokedex";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Platform = () => (
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
);


const Avatar = ({id, info}) => {
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
          alt={`picture of ${info.name} pokemon`}
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
};

const Pokemon = ({id}) => {
  const [info, setInfo] = React.useState("")

  React.useEffect(() => {
    getPokemonInfo(id)
      .then(setInfo)
  }, [id])

  return (
    <div className={"d-flex flex-column-reverse"}>
      <Platform/>
      <Avatar id={id} info={info}/>
    </div>
  )
};

export default Pokemon