export interface IPokemonPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}

export interface IPokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  attack: number;
  defense: number;
  hp: number;
  SPAttack: number;
  SPDefense: number;
  speed: number;
  weight: number;
  totalMoves: number;
}
