import { getPokemonInfo, getPokemonListWithSpecies } from "@/core/apis/pokemon";
import { PokemonBasic, PokemonType } from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import TypeLabel from "@/components/common/typeLabel";
import { convertLanguage } from "@/core/utils/convertLanguage";

interface pokemonProps {
  pokemonIndex: string;
}

interface nameTextType {
  language: PokemonBasic;
  name: string;
}

export const PokemonCard = ({ pokemonIndex }: pokemonProps) => {
  const { data: pokemonInfo } = useQuery({
    queryKey: ["pokemons", pokemonIndex],
    queryFn: () => getPokemonInfo(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`),
    enabled: !!pokemonIndex,
  });

  const { data: pokemonSpeciesInfo } = useQuery({
    queryKey: ["pokemon-species", pokemonInfo?.species?.name],
    queryFn: () => getPokemonListWithSpecies(pokemonInfo?.species?.name),
    enabled: !!pokemonInfo?.species?.name,
  });

  // 포켓몬 설명 언어 변환
  let nameText: nameTextType[] = convertLanguage(pokemonSpeciesInfo?.names);

  return (
    <Link
      to={`/pokemon/${pokemonInfo?.id}`}
      className="flex flex-col p-5 w-full bg-[#fff] rounded-2xl shadow-md"
    >
      <div className="flex items-center text-base">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="포켓볼"
        />
        <span className="font-galmuri">{nameText && nameText[0]?.name}</span>
      </div>
      <span className="font-galmuri"># {pokemonInfo?.id}</span>

      <div className="p-5 h-[160px] flex items-center justify-center">
        <LazyLoadImage
          key={pokemonInfo?.id}
          src={
            pokemonInfo?.sprites?.versions?.["generation-v"]?.["black-white"]
              ?.animated?.front_default || pokemonInfo?.sprites?.front_default
          }
          alt={pokemonInfo?.name}
          className="img-lazy"
          width={
            pokemonInfo?.sprites?.versions?.["generation-v"]?.["black-white"]
              ?.animated?.front_default
              ? 80
              : 120
          }
          height={120}
        />
      </div>

      <div className="flex group is-card">
        {pokemonInfo?.types?.map((type: PokemonType, index: number) => {
          return <TypeLabel key={index} typeData={type} />;
        })}
      </div>
    </Link>
  );
};
