import { HTMLAttributes } from 'react';

import { POKEMON_TYPES } from '../../services/pokemon.service';
import { IPokemon } from '../../types';
import capitalize from '../../helpers/capitalize';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  pokemon: IPokemon;
}

export default function Card({ pokemon, onClick }: ICardProps) {
  return (
    <div
      className="flex flex-col h-full relative overflow-hidden p-16 bg-slate-50 border-[1px] rounded-xl drop-shadow-sm text-center cursor-pointer"
      onClick={onClick}
    >
      <div
        className="w-[320px] h-[320px] rounded-full absolute -top-[35%] -left-[4%] -z-10"
        style={{
          backgroundColor: POKEMON_TYPES[pokemon.types[0]].color,
        }}
      />
      <img
        className="w-[170px] h-[170px] object-contain"
        src={pokemon.sprite}
        alt={pokemon.name}
      />
      <h1 className="mt-4 font-bold text-2xl">{capitalize(pokemon.name)}</h1>
      <div className="mt-4">
        {pokemon.types.map((type) => (
          <span
            className="mx-2 p-2 text-white rounded-md"
            style={{ backgroundColor: POKEMON_TYPES[type].color }}
            key={type}
          >
            {capitalize(type)}
          </span>
        ))}
      </div>
    </div>
  );
}
