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

function summarizePokemonStats(stats) {
  console.log(stats)
  let statsArray = []
  let stat
   //statsArray will contain array of base stats in this order: [hp,attack,defence,sp.attack,sp.defence,speed]
  for (stat in stats){
    statsArray.push(stats[stat].base_stat)
  }

  return statsArray
}
export {getPokemonInfo , summarizePokemonStats}

export {getPokemonInfo}
