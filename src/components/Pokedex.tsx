import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../types/Pokemon";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";

type PokedexProps = {
  pokemonList: Pokemon[];
  setModal: (value: boolean) => void;
  fetchNextPage: () => void;
  modalOpen: boolean;
};

export const Pokedex = ({
  pokemonList,
  setModal,
  modalOpen,
  fetchNextPage,
}: PokedexProps) => {
  // The useInView hook makes it easy to monitor the inView state of your components. Call the useInView hook with the (optional) options you need. It will return an array containing a ref, the inView status and the current entry. Assign the ref to the DOM element you want to monitor, and the hook will report the status.

  const { ref, inView } = useInView();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Call fetchNextPage when the bottom of the list is in view
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleSetPokemonData = (pokemon: any) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setModal(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="mb-36">
      <ModalComponent
        isOpen={modalOpen}
        onClose={handleCloseModal}
        pokemonData={selectedPokemon}
      />

      <div className="grid gap-4 row-gap-12 px-6 py-2 m-auto column-gap-2 md:grid-cols-3">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            setModal={setModal}
            setPokemonData={handleSetPokemonData}
          />
        ))}
      </div>

      <div
        ref={ref}
        className="flex items-center rounded-md justify-center w-[50%] px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 my-8 mx-auto"
      >
        Loading...
      </div>
    </div>
  );
};
