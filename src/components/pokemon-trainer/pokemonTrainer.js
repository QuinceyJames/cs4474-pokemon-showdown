import React from "react";
import "./pokemonTrainer.scss"


const PokemonTrainer = ({height = 200}) => (
  <img
    style={{
      width: "100%",
      height: height + "px",
      objectFit: "contain",
    }}
    src={"https://cdn.bulbagarden.net/upload/thumb/9/91/Ash_M23.png/150px-Ash_M23.png"}
  />
);

export default PokemonTrainer