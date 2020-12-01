//type chart from https://gist.github.com/agarie/2620966
const TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];
const TYPE_ORDER = {
  normal: 0,
  fire: 1,
  water: 2,
  electric: 3,
  grass: 4,
  ice: 5,
  fighting: 6,
  poison: 7,
  ground: 8,
  flying: 9,
  psychic: 10,
  bug: 11,
  rock: 12,
  ghost: 13,
  dragon: 14,
  dark: 15,
  steel: 16,
  fairy: 17,
};
const TYPE_CHART = {
  normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
  dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
  steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
  fairy: [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
};

const fetch = require("node-fetch");

//returns 0.5 or 0.25 if not effectve
//returns 2 or 4 if super effective
//else returns 1
//used for visual effectiveness indicator
function effectiveness(moveType, pokemonType1, pokemonType2 = "") {
  effective_mod = TYPE_CHART[moveType][TYPE_ORDER[pokemonType1]];

  console.log(pokemonType1);
  if (pokemonType2 != "") {
    effective_mod *= effectiveness(moveType, pokemonType2);
  }

  console.log(effective_mod);
  return effective_mod;
}

//given a move name and a two pokemon objects (one source, one target)
//calculates the damage that move would deal
async function damageCalc(move, source, target) {
  const response = await fetch("https://pokeapi.co/api/v2/move/" + move);
  const json = await response.json();

  console.log(json.type);

  var damage_class = json.damage_class.name;
  var move_type = json.type.name;
  var power = json.power;

  var source_type = source.getType();
  var target_type = target.getType();

  var source_atk;
  var target_def;

  var source_lvl = source.getLevel();
  console.log(source.stats);
  //use physical atk/def for physical moves
  //use special atk/def for special moves
  if (damage_class == "physical") {
    source_atk = source.getStats().atk;
    target_def = target.getStats().def;
  } else if (damage_class == "special") {
    source_atk = source.getStats().spa;
    target_def = target.getStats().spd;
  } else {
    //status moves do no damage, so return 0
    return 0;
  }

  //actual damage calc has random variance
  //move can do 85%-100% damage
  //this calc assumes 100%
  var damage =
    (((2 * source_lvl) / 5 + 2) * power * (source_atk / target_def)) / 50 + 2;

  //modifier for type effectiveness
  var effective_mod;
  if (target_type.length == 1) {
    console.log("bbb");
    effective_mod = effectiveness(move_type, target_type[0]);
    console.log(effective_mod);
  } else {
    console.log("aaa");
    effective_mod = effectiveness(move_type, target_type[0], target_type[1]);
    console.log(effective_mod);
  }

  //STAB = Same Type Attack Bonus
  //1.5x modifier applied when move type and pokemon type are the same
  var stab = 1;
  for (var i = 0; i < source_type.length; i++) {
    if (move_type == source_type[i]) {
      stab = 1.5;
      break;
    }
  }

  modifier = stab * effective_mod;

  final_damage = Math.floor(damage * modifier);
  console.log(final_damage);

  return final_damage;
}

//used to represent active pokemon
class Pokemon {
  //moves is list, rest strings
  //species is species name
  //condition is an array: [currentHP, maxHP]
  constructor(species, moves, condition, level, stats /*, type1, type2 = ''*/) {
    this.species = species;

    this.level = level;
    this.stats = stats;
    //server does not return pokemon's type
    //will have to find another way
    this.type1 = "";
    this.type2 = "";

    this.moves = moves;

    this.currHP = condition[0];
    this.maxHP = condition[1];

    //set true when currHP = 0
    this.isKnockedOut = false;
  }

  //knocks out a pokemon
  knockOut() {
    this.isKnockedOut = True;
  }

  isKO() {
    return this.isKnockedOut;
  }

  setType1(type) {
    this.type1 = type;
  }
  setType2(type) {
    this.type2 = type;
  }

  getType() {
    if (this.type2 == "") {
      return [this.type1];
    } else {
      return [this.type1, this.type2];
    }
  }
  getSpecies() {
    return this.species;
  }

  getMove(index) {
    return this.moves[index];
  }

  //maybe change to separate getters for each stat
  getStats() {
    return this.stats;
  }

  getLevel() {
    return this.level;
  }

  getHP() {
    return this.currHP;
  }

  getMaxHP() {
    return this.maxHP;
  }
}

async function getType(poke) {
  var name = poke.getSpecies();

  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
  const json = await response.json();

  for (var i = 0; i < json.types.length; i++) {
    if (i == 0) {
      poke.setType1(json.types[i].type.name);
    } else {
      poke.setType2(json.types[1].type.name);
    }
  }

  console.log(poke.getType());
}

module.exports.effectiveness = effectiveness;
module.exports.Pokemon = Pokemon;
module.exports.damageCalc = damageCalc;

/*
async function aa() {
  pokemon1 = new Pokemon(
    "reshiram",
    ["blueflare", "toxic", "dracometeor", "roost"],
    ["283", "283"],
    78,
    { atk: 192, def: 201, spa: 279, spd: 232, spe: 185 }
  );

  await getType(pokemon1);

  pokemon2 = new Pokemon(
    "politoed",
    ["rest", "scald", "hypnosis", "perishsong"],
    ["288", "288"],
    84,
    { atk: 131, def: 174, spa: 199, spd: 216, spe: 166 }
  );

  await getType(pokemon2);

  damageCalc("draco-meteor", pokemon1, pokemon2);
}

aa();
*/
