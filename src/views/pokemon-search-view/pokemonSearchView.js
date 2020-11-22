import Row from "react-bootstrap/Row";
import React, {Children} from "react";
import PokemonFileFolder from "../../components/pokemon-file-folder/pokemonFileFolder";
import "./pokemonSearchView.scss"
import Pokemon from "../../components/pokemon/pokemon";

const FileFolderScroller = ({children}) => {
  const [fileFolderIndex, setFileFolderIndex] = React.useState(0);
  const size = Children.count(children)

  console.log({fileFolderIndex})

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

const PokemonSearchView = () => (
  <Row className={"pokemon-search-view"}>

    <div className="pokemon-preview">
      <Pokemon avatar/>
    </div>

    <FileFolderScroller>
      <PokemonFileFolder title="Recommended"/>
      <PokemonFileFolder title="Water Type"/>
      <PokemonFileFolder title="Water Type"/>
      <PokemonFileFolder title="Earth Type"/>
    </FileFolderScroller>
  </Row>
);

export default PokemonSearchView;