import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../types/Pokemon";

type PokedexProps = {
  pokemonList: Pokemon[];
  setModal: (value: boolean) => void;
};

export const Pokedex = (props: PokedexProps) => {
  return (
    <div className="mb-36">
      <div className="grid gap-4 row-gap-12 px-6 py-2 m-auto column-gap-2 md:grid-cols-3">
        {props.pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            setModal={props.setModal}
          />
        ))}
      </div>
      TODO:
      {/* Infinite scroll and Button Container logic */}
    </div>
  );
};
