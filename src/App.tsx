import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { pokemonListAsync } from "./features/pokemon/pokemonSlice";
import { useAppDispatch } from "./app/hooks";
import { Pokedex } from "./components/Pokedex";

function App() {
  const dispatch = useAppDispatch();
  const pokemonList = useSelector((state: RootState) => state.pokemon.pokemon);
  const status = useSelector((state: RootState) => state.pokemon.status);
  const [modalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // Initial page number

  useEffect(() => {
    // Fetch initial data when component mounts
    if (currentPage > 0) {
      dispatch(pokemonListAsync({ amount: 20, page: currentPage }));
    }
  }, [currentPage, dispatch]);

  console.log(pokemonList, status);

  const fetchNextPage = () => {
    if (status !== "loading") {
      // console.log("Fetching next page");
      setCurrentPage((prevPage) => prevPage + 1);
      dispatch(pokemonListAsync({ amount: 20, page: currentPage + 1 }));
    }
  };

  return (
    <div className="App">
      <Pokedex
        modalOpen={modalOpen}
        setModal={setModalOpen}
        pokemonList={pokemonList}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

export default App;
