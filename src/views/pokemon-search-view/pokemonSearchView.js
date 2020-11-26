import Row from "react-bootstrap/Row";
import React, {Children} from "react";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import "./pokemonSearchView.scss"
import Pokemon from "../../components/pokemon/pokemon";
import {connect} from "react-redux";
import openTeamBuilder from "../../features/app-state/actions/openTeamBuilder";
import Button from "../../components/button/button";

const FileFolderScroller = ({children}) => {
  const [fileFolderIndex, setFileFolderIndex] = React.useState(0);
  const size = Children.count(children)

  return (
    <div
      className={`file-folder-scroller order-${fileFolderIndex}`}
      onWheel={event => setFileFolderIndex(oldIndex => {
        const deltaY = event.deltaY;

        if (deltaY > 0) {
          return (oldIndex + 1) % size;
        } else if (deltaY < 0) {
          return oldIndex === 0 ? size - 1 : oldIndex - 1;
        } else {
          return oldIndex
        }
      })}

    >
      {children}
    </div>
  )
}

const PokemonSearchView = ({openTeamBuilder, activePokemon}) => {
  return (
    <Row className={"pokemon-search-view"}>

      <div className="pokemon-preview">
        <Pokemon avatar id={activePokemon?.id} icon platform/>
      </div>

      <Button onClick={() => openTeamBuilder()}>Save</Button>

      <FileFolderScroller>
        {
          ["Recommended", "Water Type", "Earth Type", "Air Type"]
            .map((title, key) =>
              <PokemonFileFolder
                key={key}
                title={title}
              />
            )
        }
      </FileFolderScroller>
    </Row>
  );
}

const mapDispatchToProps = {openTeamBuilder}
const mapStateToProps = ({appState: {activePokemon}}) => ({activePokemon})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonSearchView);