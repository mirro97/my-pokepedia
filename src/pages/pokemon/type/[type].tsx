import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PokemonBasic } from "@/types";
import { PokemonCard } from "@/components/pokemon/card";
import { getPokemonListWithType } from "@/core/apis/pokemon";
import { convertLanguage } from "@/core/utils/convertLanguage";
import { BackgroundColor, TextColor } from "@/core/utils/convertTextToColor";
import { useEffect, useState } from "react";

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
  const { data: typedPokemonList } = useQuery({
    queryKey: ["typed-pokemonList", type],
    queryFn: () => getPokemonListWithType(type),
    enabled: !!type,
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  // 포켓몬 타입 언어 변환
  let typeText: typeTextType[] = convertLanguage(typedPokemonList?.names);

  console.log(typedPokemonList);

  return (
    <div className="py-24 px-4 sm:px-12 flex-1">
      <div className="p-5 w-full bg-[#fff] rounded-2xl shadow-md">
        <div className="flex">
          <div className="w-8 mr-3">
            <img src={`/images/pokemon-type-images/${type}.svg`} alt={type} />
          </div>

          <span className={`text-2xl font-bold  ${type && TextColor[type]}`}>
            {typeText && typeText[0]?.name}
          </span>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setScrollPosition(0);
            }}
            className={`fixed top-20 right-5 w-9 rounded-full overflow-hidden p-1 shadow-md ${
              type && BackgroundColor[type]
            }
            ${scrollPosition < 200 ? "hidden" : ""}
            `}
          >
            <img src={`/images/pokemon-type-images/${type}.svg`} alt={type} />
          </button>
        </div>
      </div>
      <div className="w-full mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {typedPokemonList?.pokemon?.map((data: PokemonType, index: number) => (
          <PokemonCard key={index} pokemonIndex={data?.pokemon?.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonType;
