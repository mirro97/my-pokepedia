import { PokemonType } from "@/types";
import PokemonTypeLabel from "@/features/pokemon/components/PokemonTypeLabel";
import { POKEMON_TYPE_LIST } from "@/shared/constants/pokemon";

const typeListAll: PokemonType[] = POKEMON_TYPE_LIST.map((type) => ({
  slot: 0,
  type: { name: type, url: "" },
}));

const PokemonTypeNav = () => {
  return (
    <nav className="group is-tab sm:px-0 py-7 flex flex-wrap">
      {typeListAll.map((type: PokemonType, index: number) => (
        <PokemonTypeLabel key={index} typeData={type} />
      ))}
    </nav>
  );
};

export default PokemonTypeNav;
