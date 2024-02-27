import { useEffect, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { pokemonListAsync, nextPage } from "./features/pokemon/pokemonSlice";
import { useAppDispatch } from "./app/hooks";
import { Pokedex } from "./components/Pokedex";

function App() {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const { pokemon, status, page } = useSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    // Fetch initial data when component mounts or page changes
    dispatch(pokemonListAsync({ amount: 20, page }));
  }, [page, dispatch]);

  // console.log(pokemonList, status);

  const fetchNextPage = () => {
    if (status !== "loading") {
      // Increment the page number in the Redux store
      dispatch(nextPage());
    }
  };

  return (
    <div className="App">
      <Pokedex
        modalOpen={modalOpen}
        setModal={setModalOpen}
        pokemonList={pokemon}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

export default App;
