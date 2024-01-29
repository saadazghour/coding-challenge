// This function now fetches details of a single Pokemon by name.
export const fetchPokemon = async (pokemonName: string) => {
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching pokemon details: ", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
