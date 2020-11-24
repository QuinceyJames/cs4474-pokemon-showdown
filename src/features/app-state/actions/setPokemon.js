export default function action(pokemon = {id: 0}) {
  return {
      type: "SET_POKEMON",
      payload: pokemon

  }
}