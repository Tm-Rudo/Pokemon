// phím tắt rafce

import React from "react";
import { Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;
  //lay id cua pokemon
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      //gọi
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  };
  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}

        {pokemons.map((pokemon) => {
          return (
            <div onClick={() => selectPokemon(pokemon.id)}>
              <PokemonList
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={pokemon.id}
                name={pokemon.name}
                abilities={pokemon.abilities}
                id={pokemon.id}
                image={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PokemonColection;
