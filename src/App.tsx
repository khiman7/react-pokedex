import { QueryFunction, useInfiniteQuery } from 'react-query';

import { fetchPokemon, reduceResults } from './services/pokemon.service';
import { IPokemonPage } from './types';

import Header from './components/Header';
import List from './components/List';

function App() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<IPokemonPage>({
      queryKey: 'pokemon',
      queryFn: fetchPokemon as unknown as QueryFunction<IPokemonPage>,
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
    });

  return (
    <div className="w-full font-inter">
      <Header />
      <main className="container flex items-center flex-col 2xl:w-[960px] mx-auto my-8">
        {data && <List data={reduceResults(data?.pages as IPokemonPage[])} />}
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
      </main>
    </div>
  );
}

export default App;
