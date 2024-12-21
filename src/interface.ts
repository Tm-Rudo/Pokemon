export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

//
export interface PokemonDetail extends Pokemon {
  //mấy filek= khác báo đỏ, thêm ? để có cũng đc k có cũng đc
  abilities?: {
    ability: string;
    name: string;
  }[];
}
