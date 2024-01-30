import { Pokemon } from "../types/Pokemon";
import { ReactComponent as BoltIcon } from "../assets/icon-bolt.svg";
import Card from "./Card";

type PokemonCardProps = {
  pokemon: Pokemon;
  setModal?: (value: boolean) => void;
  setPokemonData?: (data: Pokemon) => void;
};

export const PokemonCard = ({
  pokemon,
  setModal,
  setPokemonData,
}: PokemonCardProps) => {
  const handleClick = async () => {
    if (setPokemonData) {
      setPokemonData(pokemon);
    }

    if (setModal) {
      setModal(true);
    }
  };

  return (
    <Card className="max-w-sm">
      <div className="relative flex flex-col items-center p-6 text-center border border-gray-800 rounded-lg bg-opacity-15">
        <span className="mx-2 my-1 mt-8 text-2xl font-semibold leading-none tracking-tighter text-center capitalize text-neutral-800 lg:text-3xl">
          {pokemon.name}
        </span>

        <p className="mt-3 text-base leading-relaxed text-gray-500 dark:text-white">
          Height: {pokemon?.height}, Weight: {pokemon?.weight}
        </p>

        <button
          onClick={handleClick}
          className="flex items-center justify-center w-full h-12 gap-2 px-10 py-4 text-base font-semibold text-center text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-b-lg saad rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <BoltIcon />
          View more
        </button>
      </div>
    </Card>
  );
};
