import api from "pokedex-promise-v2"
const apiInstance = new api()

function getPokemonInfo(id) {
  return apiInstance
    .getPokemonByName(id)
    .then(response => ({
      ...response,
      image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
    }))
    .catch(console.error)
}

export {getPokemonInfo}