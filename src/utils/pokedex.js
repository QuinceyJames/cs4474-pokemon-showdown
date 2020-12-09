import api from "pokedex-promise-v2"

const apiInstance = new api()

function getPokemonInfo(id) {
  return apiInstance
    .getPokemonByName(id)
    .then(response => ({
      ...response,
      image: response?.sprites["other"]["official-artwork"]["front_default"]
    })).catch(console.error)
}

function getPokemonTypes() {
  return apiInstance
    .getTypesList()
    .catch(console.error)
}

function getPokemonByType(name) {
  return apiInstance
    .getTypeByName(name)
    .catch(console.error)
}

function getPokemonDescription(id) {
  return apiInstance
    .getPokemonSpeciesByName(id)
    .then(result => result["flavor_text_entries"]?.find(x => x.language.name === "en")["flavor_text"])
    .catch(console.error)
}

function getItemCategories() {
  return apiInstance
    .getItemCategoriesList()
    .catch(console.error)
}

function getItemCategoryByName(name) {
  return apiInstance
    .getItemCategoryByName(name)
    .catch(console.error)
}

function getItemByName(name) {
  return apiInstance
    .getItemByName(name)
    .catch(console.error)
}

function getMoveCategoriesList() {
  return apiInstance
    .getMoveCategoriesList()
    .catch(console.error)
}

function getMoveDescription(name) {
  return apiInstance
    .getMoveByName(name)
    .then(result => result["flavor_text_entries"]?.find(x => x.language.name === "en")["flavor_text"])
    .catch(console.error)
}

export {
  getPokemonInfo,
  getPokemonTypes,
  getPokemonByType,
  getPokemonDescription,
  getItemCategories,
  getItemCategoryByName,
  getItemByName,
  getMoveCategoriesList,
  getMoveDescription
}