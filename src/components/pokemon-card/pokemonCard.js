import React from "react";
import {connect} from "react-redux";

function isPokemonDisabled(candidate, active, activeList) {
  const activeNames = activeList.map(pokemon => pokemon?.name)

  if (!candidate?.name) {
    return true;
  } else if (candidate.name === active?.name) {
    return false;
  } else if (activeNames.includes(candidate.name)) {
    return true;
  }

  return false;
}

const PokemonCard = ({pokemon, dragging, activePokemon, activePokemonList, children}) => {
  const [expand, setExpand] = React.useState({pre: false, post: false});
  const disabled = isPokemonDisabled(pokemon, activePokemon, activePokemonList)
  const isSelected = activePokemon?.name === pokemon?.name;

  React.useEffect(() => setExpand({pre: false, post: false}), [dragging])

  return (
    <li
      onMouseEnter={() => setExpand(({pre, post}) => ({pre: true, post: true}))}
      onMouseLeave={() => setExpand({pre: false, post: false})}
      className={`${expand.post ? "expand" : ""} ${dragging} ${disabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`}
    >
      {children}
    </li>
  )
}

const mapStateToProps = ({appState: {activePokemonList, activePokemon}}) => ({activePokemonList, activePokemon})
export default connect(mapStateToProps)(PokemonCard);