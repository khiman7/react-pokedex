import { useState } from 'react';
import { QueryFunction, useInfiniteQuery } from 'react-query';

import capitalize from '../../helpers/capitalize';
import pad from '../../helpers/pad';
import { IPokemon, IPokemonPage } from '../../types';
import {
  POKEMON_TYPES,
  fetchPokemonPage,
  reduceResults,
} from '../../services/pokemon.service';

import Modal from '../Modal';
import Card from '../Card';
import { ReactComponent as Cross } from '../../assets/cross.svg';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<IPokemonPage>({
      queryKey: 'pokemon',
      queryFn: fetchPokemonPage as unknown as QueryFunction<IPokemonPage>,
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
    });

  function filterPokemon(pokemon: IPokemon[]) {
    if (filter) {
      return pokemon.filter((p) => p.types.includes(filter));
    }

    return pokemon;
  }

  return (
    <>
      <ul className="w-full flex flex-wrap justify-center">
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
      <ul className="w-full flex flex-wrap justify-items-center mt-[32px]">
        {data &&
          filterPokemon(reduceResults(data?.pages as IPokemonPage[]))?.map(
            (pokemon) => (
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
            )
          )}
      </ul>
      {hasNextPage && (
        <button
          className="w-1/2 mt-8 p-4 text-white font-bold rounded-md bg-[#dc2626]"
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        {pokemon && (
          <div
            className="p-10 md:p-12 flex flex-col items-center rounded-2xl relative border-[1px] border-slate-300"
            style={{
              backgroundColor: POKEMON_TYPES[pokemon.types[0]].color,
            }}
          >
            <button type="button" onClick={() => setOpen(false)}>
              <Cross
                className="absolute top-3 right-3 md:top-4 md:right-4"
                fill="#fff"
                width={24}
              />
            </button>
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
