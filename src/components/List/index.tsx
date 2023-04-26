import { HTMLAttributes, useState } from 'react';

import capitalize from '../../helpers/capitalize';
import pad from '../../helpers/pad';
import { IPokemon } from '../../types';
import { POKEMON_TYPES } from '../../services/pokemon.service';

import Modal from '../Modal';
import Card from '../Card';

interface IListProps extends HTMLAttributes<HTMLUListElement> {
  data: IPokemon[];
}

export default function List({ data }: IListProps) {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>();

  function filterPokemon(pokemon: IPokemon[]) {
    if (filter) {
      return pokemon.filter((p) => p.types.includes(filter));
    }

    return pokemon;
  }

  return (
    <>
      <ul className="flex flex-wrap justify-center">
        {Object.keys(POKEMON_TYPES).map((type) => {
          const { color, icon: Icon } = POKEMON_TYPES[type];

          return (
            <button
              type="button"
              key={type}
              onClick={() => setFilter((prev) => (prev !== type ? type : null))}
              className="flex flex-col justify-center items-center m-4 cursor-pointer"
            >
              <Icon
                className="ease-in-out duration-300 hover:-translate-y-2"
                fill={!filter || type === filter ? color : 'gray'}
                width={48}
              />
              <p className="font-medium mt-2">{capitalize(type)}</p>
            </button>
          );
        })}
      </ul>
      <ul className="flex flex-wrap justify-items-center mt-[32px]">
        {filterPokemon(data)?.map((pokemon) => (
          <li
            className="flex basis-full md:basis-1/2 lg:basis-1/3 justify-center mb-4"
            key={pokemon.name}
          >
            <Card
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => {
                setPokemon(pokemon);
                setOpen(true);
              }}
            />
          </li>
        ))}
      </ul>

      <Modal open={open} onClose={() => setOpen(false)}>
        {pokemon && (
          <div
            className="p-12 flex flex-col items-center rounded-2xl"
            style={{
              backgroundColor: POKEMON_TYPES[pokemon.types[0]].color,
            }}
          >
            <div className="bg-white rounded-md border-2 border-slate-300">
              <img
                className="w-[250px] h-[250px] object-contain"
                src={pokemon.sprite}
                alt={pokemon.name}
              />
            </div>
            <h1 className="mt-4 font-bold text-2xl text-white">
              {capitalize(pokemon.name as string)} #
              {pad(pokemon.id.toString(), 3)}
            </h1>
            <table className="w-full mt-4 rounded-md border-2 border-slate-300 bg-white text-center">
              <tbody>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    Type
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.types.map((type) => capitalize(type)).join(', ')}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    Attack
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.attack}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    Defense
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.defense}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    HP
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.hp}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    SP Attack
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.SPAttack}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    SP Defense
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.SPDefense}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    Speed
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.speed}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    Weight
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.weight}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium border-[2px] border-slate-300">
                    Total moves
                  </td>
                  <td className="border-[2px] border-slate-300">
                    {pokemon.totalMoves}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </>
  );
}
