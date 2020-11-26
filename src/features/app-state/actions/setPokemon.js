export default function action(pokemonIndex, pokemon) {
  console.log("setPokemon", pokemonIndex, pokemon)
  return {
      type: "SET_POKEMON",
      payload: {pokemonIndex, pokemon}
  }
}