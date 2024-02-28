import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { Pokemon, PokemonListResponse } from "../../types/Pokemon";
import { fetchPokemonList } from "./pokemonAPI";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

export interface PockemonListState {
  pokemon: Pokemon[];
  status: "idle" | "loading" | "failed";
  page: number; // For pagination
  selectedPokemon: Pokemon | null;
  modalVisible: boolean;
}

const initialPokemonListState: PockemonListState = {
  pokemon: [],
  status: "idle",
  page: 0, // For pagination
  selectedPokemon: null,
  modalVisible: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(pokemonListAsync())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// The async thunk to fetch the list of Pokemon
export const pokemonListAsync = createAsyncThunk(
  "pokemon/fetchList",
  async ({ amount, page }: { amount: number; page: number }) => {
    const response = (await fetchPokemonList(
      amount,
      page
    )) as PokemonListResponse;
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialPokemonListState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes.

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    selectPokemon: (state, action: PayloadAction<Pokemon>) => {
      // Logic to set the selected Pokemon
    },
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload;
    },
    setModalVisible: (state, action: PayloadAction<boolean>) => {
      state.modalVisible = action.payload;
    },
    nextPage: (state) => {
      state.page += 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(pokemonListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(pokemonListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.pokemon = [...state.pokemon, ...action.payload];
        state.page += 1; // Update page after successful fetch
      })
      .addCase(pokemonListAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { selectPokemon, nextPage, setSelectedPokemon, setModalVisible } =
  pokemonSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;
