import { SVGProps } from 'react';

import { IPokemon, IPokemonPage } from '../types';

import { ReactComponent as Normal } from '../assets/normal.svg';
import { ReactComponent as Fire } from '../assets/fire.svg';
import { ReactComponent as Water } from '../assets/water.svg';
import { ReactComponent as Electric } from '../assets/electric.svg';
import { ReactComponent as Grass } from '../assets/grass.svg';
import { ReactComponent as Ice } from '../assets/ice.svg';
import { ReactComponent as Fairy } from '../assets/fairy.svg';
import { ReactComponent as Fighting } from '../assets/fighting.svg';
import { ReactComponent as Poison } from '../assets/poison.svg';
import { ReactComponent as Ground } from '../assets/ground.svg';
import { ReactComponent as Flying } from '../assets/flying.svg';
import { ReactComponent as Psychic } from '../assets/psychic.svg';
import { ReactComponent as Bug } from '../assets/bug.svg';
import { ReactComponent as Rock } from '../assets/rock.svg';
import { ReactComponent as Ghost } from '../assets/ghost.svg';
import { ReactComponent as Dragon } from '../assets/dragon.svg';
import { ReactComponent as Dark } from '../assets/dark.svg';
import { ReactComponent as Steel } from '../assets/steel.svg';

export const POKEMON_TYPES: {
  [key: string]: { color: string; icon: React.FC<SVGProps<SVGSVGElement>> };
} = {
  normal: {
    color: '#5a8fa1',
    icon: Normal,
  },
  fire: {
    color: '#ff9c54',
    icon: Fire,
  },
  water: {
    color: '#4d90d5',
    icon: Water,
  },
  electric: {
    color: '#f3d23b',
    icon: Electric,
  },
  grass: {
    color: '#63bb5b',
    icon: Grass,
  },
  ice: {
    color: '#74cec0',
    icon: Ice,
  },
  fairy: {
    color: '#ec8fe6',
    icon: Fairy,
  },
  fighting: {
    color: '#ce4069',
    icon: Fighting,
  },
  poison: {
    color: '#ab6ac8',
    icon: Poison,
  },
  ground: {
    color: '#d97746',
    icon: Ground,
  },
  flying: {
    color: '#8fa8dd',
    icon: Flying,
  },
  psychic: {
    color: '#f97176',
    icon: Psychic,
  },
  bug: {
    color: '#90c12c',
    icon: Bug,
  },
  rock: {
    color: '#c7b78b',
    icon: Rock,
  },
  ghost: {
    color: '#5269ac',
    icon: Ghost,
  },
  dragon: {
    color: '#0a6dc4',
    icon: Dragon,
  },
  dark: {
    color: '#5a5366',
    icon: Dark,
  },
  steel: {
    color: '#5a8ea1',
    icon: Steel,
  },
};

export async function fetchPokemon(url: string): Promise<IPokemon> {
  const res = await fetch(url);
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.other.dream_world.front_default,
    types: data.types.map(
      (type: { slot: number; type: { type: string; name: string } }) =>
        type.type.name
    ),
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    hp: data.stats[0].base_stat,
    SPAttack: data.stats[3].base_stat,
    SPDefense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
    weight: data.weight,
    totalMoves: data.moves.length,
  };
}

export async function fetchPokemonPage({
  pageParam = 'https://pokeapi.co/api/v2/pokemon?limit=12',
}) {
  const res = await fetch(pageParam);
  const data = await res.json();

  data.results = await Promise.all(
    data.results.map((result: { name: string; url: string }) => {
      return fetchPokemon(result.url);
    })
  );

  return data;
}

export function reduceResults(pages: IPokemonPage[]) {
  return pages.reduce(
    (results, page) => [...results, ...page.results],
    [] as IPokemon[]
  );
}
