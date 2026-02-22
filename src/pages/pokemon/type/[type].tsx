import { useParams } from "react-router-dom";
import { PokemonBasic } from "@/types";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";
import { PokemonGrid } from "@/features/pokemon/components/PokemonGrid";
import { useLocalizedList } from "@/shared/hooks/useLocalizedList";
import { POKEMON_TYPE_BG, POKEMON_TYPE_TEXT } from "@/shared/constants/pokemon";
import { useScrollPosition } from "@/shared/hooks/useScrollPosition";
import { usePokemonByType } from "@/features/pokemon/hooks";

interface PokemonType {
  pokemon: PokemonBasic;
  slot: number;
}

interface typeTextType {
  language: PokemonBasic;
  name: string;
}

const PokemonType = () => {
  const { type } = useParams();
  const { data: typedPokemonList } = usePokemonByType(type);
  const scrollPosition = useScrollPosition();

  // 포켓몬 타입 언어 변환
  const typeText: typeTextType[] = useLocalizedList(typedPokemonList?.names);

  return (
    <div className="py-24 px-4 sm:px-12 flex-1">
      <div className="p-5 w-full bg-[#fff] rounded-2xl shadow-md">
        <div className="flex">
          <div className="w-8 mr-3">
            <img src={`/images/pokemon-type-images/${type}.svg`} alt={type} />
          </div>

          <span
            className={`text-2xl font-bold  ${type && POKEMON_TYPE_TEXT[type]}`}
          >
            {typeText && typeText[0]?.name}
          </span>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`fixed top-20 right-5 w-9 rounded-full overflow-hidden p-1 shadow-md ${
              type && POKEMON_TYPE_BG[type]
            }
            ${scrollPosition < 200 ? "hidden" : ""}
            `}
          >
            <img src={`/images/pokemon-type-images/${type}.svg`} alt={type} />
          </button>
        </div>
      </div>
      <PokemonGrid>
        {typedPokemonList?.pokemon?.map((data: PokemonType, index: number) => (
          <PokemonCard key={index} pokemonIndex={data?.pokemon?.name} />
        ))}
      </PokemonGrid>
    </div>
  );
};

export default PokemonType;
