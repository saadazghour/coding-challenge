export type Pokemon = {
  id: number;
  name: string;
  types: [{ type: { name: string } }];
  weight: number;
  height: number;
  stats: [{ base_stat: number; stat: { name: string } }];
};

export interface PokemonListResponse {
  data: Pokemon[]; // Adjust based on the actual structure
  error?: Error;
}
