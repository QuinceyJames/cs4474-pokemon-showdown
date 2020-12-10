import React from "react";
import "./pokemonTeam.scss";
import Container from "react-bootstrap/Container";
import Pokemon from "../pokemon/pokemon";

const PokemonTeam = (pokemonList) => (
  <>
    <Container
      style={{ marginBottom: 60 }}
      key={pokemonList[0]}
      className={"px-1"}
    >
      <Pokemon
        id={pokemonList.pokemonList[0]}
        avatar
        platform
        animate
        highlight
        icon
      />
    </Container>
    <Container
      style={{ marginBottom: 60 }}
      key={pokemonList[1]}
      className={"px-1"}
    >
      <Pokemon
        id={pokemonList.pokemonList[1]}
        avatar
        platform
        animate
        highlight
        icon
      />
    </Container>
    <Container
      style={{ marginBottom: 60 }}
      key={pokemonList[2]}
      className={"px-1"}
    >
      <Pokemon
        id={pokemonList.pokemonList[2]}
        avatar
        platform
        animate
        highlight
        icon
      />
    </Container>
    <Container
      style={{ marginBottom: 60 }}
      key={pokemonList[3]}
      className={"px-1"}
    >
      <Pokemon
        id={pokemonList.pokemonList[3]}
        avatar
        platform
        animate
        highlight
        icon
      />
    </Container>
    <Container
      style={{ marginBottom: 20 }}
      key={pokemonList[4]}
      className={"px-1"}
    >
      <Pokemon
        id={pokemonList.pokemonList[4]}
        avatar
        platform
        animate
        highlight
        icon
      />
    </Container>
    <Container
      style={{ marginBottom: 60 }}
      key={pokemonList[5]}
      className={"px-1"}
    >
      <Pokemon
        id={pokemonList.pokemonList[5]}
        avatar
        platform
        animate
        highlight
        icon
      />
    </Container>
  </>
);

export default PokemonTeam;
