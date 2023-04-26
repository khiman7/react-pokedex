import PokemonLogo from '../../assets/pokemon-logo.png';

export default function Header() {
  return (
    <header className="pt-8">
      <div className="container 2xl:w-[960px] mx-auto">
        <div className="flex justify-center items-center">
          <img className="w-[64px] mr-4" src={PokemonLogo} alt="Pokemon Logo" />
          <p className="sm:text-[64px] text-[48px]  font-bold">Pokedex</p>
        </div>
      </div>
    </header>
  );
}
