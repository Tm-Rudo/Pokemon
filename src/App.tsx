import React, { useEffect, useState } from "react";
import "./App.css";
//gọi axios
import axios from "axios";
import PokemonColection from "./components/PokemonColection";
import { Pokemon } from "./interface";

//tạo interface
interface Pokemons {
  name: string;
  url: string;
}

export interface Detail {
  id: number;
  isOpened: boolean;
}

//
//function component
const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //state chứa link cho lượt tiếp theo
  const [nextUrl, setNextUrl] = useState<string>("");
  //loading
  const [loading, setLoading] = useState<boolean>(true);

  const [viewDetails, setDetails] = useState<Detail>({
    id: 0,
    isOpened: false,
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next); //lưu trữ url

      //lấy thông tin từng con, vòng lặp
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );

        //       console.log(poke.data);
        setPokemons((p) => [...p, poke.data]);

        //loading
        setLoading(false);
      });
    };
    getPokemon();
  }, []);

  //load more
  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon Go</header>
        {/* //truyền props */}
        <PokemonColection
          pokemons={pokemons}
          viewDetail={viewDetails}
          setDetail={setDetails}
        />
        {!viewDetails.isOpened && (
          // {/* tạo nút load more */}
          <div className="btn">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
