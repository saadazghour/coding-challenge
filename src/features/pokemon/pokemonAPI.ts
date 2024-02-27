// fetching a subset of items from a larger list, which is a common operation in pagination.

import { fetchPokemon } from "./fetchPokemon";

// Here's a breakdown of the concept:

// amount: This represents the number of items you want to display on one page.
// page: This is the index of the current page. It's usually zero-indexed, meaning the first page is 0, the second page is 1, and so on.
// offset: This represents the number of items to skip before starting to fetch the data. It's calculated by multiplying the page number by the amount of items per page.

// For example, if you're on page 1 (page = 0 since it's zero-indexed) and you want 20 items per page (amount = 20), the offset will be 0 * 20 = 0, so you start from the first item. If you're on page 2 (page = 1), the offset will be 1 * 20 = 20, so you skip the first 20 items and start fetching from the 21st item. This pattern allows you to fetch the correct subset of items for any given page number.

export async function fetchPokemonList(amount = 20, page = 0) {
  const offset = page * amount;

  return new Promise<{ data: any; error?: Error }>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${amount}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Array of promises for each Pokemon's details
      const promises = data.results.map(
        async (pokemon: { name: string }) =>
          (await fetchPokemon(pokemon.name)).data
      );

      // Wait for all promises to resolve
      const pokemonDetails = await Promise.all(promises);

      // Return the array of Pokemon details
      resolve({ data: pokemonDetails });
    } catch (error) {
      console.error("Error fetching data: ", error);
      reject(error);
    }
  });
}
