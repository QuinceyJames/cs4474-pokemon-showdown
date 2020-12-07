import api from "pokedex-promise-v2"

const apiInstance = new api()

function getPokemonInfo(id) {
  return apiInstance
    .getPokemonByName(id)
    .then(response => ({
      ...response,
      image: response?.sprites["other"]["official-artwork"]["front_default"]
    }))
    .catch(console.error)
}

function getPokemonTypes() {
  return apiInstance
    .getTypesList()
    .catch(console.error)
}

function getPokemonByType(name) {
  return apiInstance
    .getPokemonByType(name)
    .catch(console.log)
}

export {getPokemonInfo, getPokemonTypes, getPokemonByType}