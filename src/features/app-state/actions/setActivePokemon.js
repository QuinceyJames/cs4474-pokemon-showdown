export default function action(activePokemon) {
  console.log("setActivePokemon", activePokemon)
  return {
      type: "SET_ACTIVE_POKEMON",
      payload: {activePokemon}
  }
}