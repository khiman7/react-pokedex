import Header from './components/Header';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <div className="w-full font-inter">
      <Header />
      <main className="container flex items-center flex-col 2xl:w-[960px] mx-auto my-8">
        <PokemonList />
      </main>
    </div>
  );
}

export default App;
