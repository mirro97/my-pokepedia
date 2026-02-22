import {
  PokemonBasic,
  PokemonDetailType,
  PokemonSpecies,
  PokemonType,
} from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Label from "@/shared/ui/Label";
import PokemonGenerationGallery from "@/features/pokemon/components/PokemonGenerationGallery";
import PokemonTypeLabel from "@/features/pokemon/components/PokemonTypeLabel";
import ImageShadowWrap from "@/shared/ui/ImageShadowWrap";
import { useLanguageValue } from "@/shared/hooks/useLanguage";
import { useLocalizedList } from "@/shared/hooks/useLocalizedList";
import { POKEMON_IMAGE_KEYS } from "@/shared/constants/pokemon";

interface propsType {
  pokemonInfo: PokemonDetailType;
  pokemonSpeciesInfo: PokemonSpecies;
}

interface flavorTextType {
  flavor_text: string | undefined;
  language: PokemonBasic;
  version: PokemonBasic;
}

interface nameTextType {
  language: PokemonBasic;
  name: string;
}

const PokemonDetailBox = ({ pokemonInfo, pokemonSpeciesInfo }: propsType) => {
  const { lang, langNum_genera } = useLanguageValue();

  // 포켓몬 설명 언어 변환
  const flavorText: flavorTextType[] = useLocalizedList(
    pokemonSpeciesInfo?.flavor_text_entries
  );

  // 포켓몬 이름 언어 변환
  const nameText: nameTextType[] = useLocalizedList(pokemonSpeciesInfo?.names);

  return (
    <div className="flex flex-col p-10 items-center bg-[#fff] rounded-2xl shadow-xl">
      <div className="p-9">
        <div className="max-w-[180px]">
          <LazyLoadImage
            src={
              pokemonInfo?.sprites?.versions?.["generation-v"]?.["black-white"]
                ?.animated?.front_default || pokemonInfo?.sprites?.front_default
            }
            width={120}
            height={120}
          />
        </div>
      </div>
      <span className="font-bold text-gray-100"># {pokemonInfo?.id}</span>
      <span className="text-2xl font-bold">
        {nameText && nameText[0]?.name}
      </span>
      <div className="flex w-full justify-center group is-tab mt-3">
        {pokemonInfo?.types.map((type: PokemonType, index: number) => {
          return <PokemonTypeLabel key={index} typeData={type} />;
        })}
      </div>
      <div className="mt-3 text-lg font-bold text-gray-100">
        {pokemonSpeciesInfo?.genera[langNum_genera]?.genus}
      </div>
      <div className="mt-3 text-center">
        <span>{flavorText && flavorText[0]?.flavor_text}</span>
      </div>
      <div className="flex mt-10">
        <div className="flex flex-col items-center mr-5">
          <div className="max-w-[180px]"></div>
          <Label context={lang.lang === "en" ? "HEIGHT" : "신장"} />
          <span className="mt-3">{pokemonInfo?.height / 10} m</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="max-w-[180px]"></div>
          <Label context={lang.lang === "en" ? "WEIGHT" : "무게"} />
          <span className="mt-3">{pokemonInfo?.weight / 10} kg</span>
        </div>
      </div>

      <div className="mt-10 max-w-3xl w-full flex flex-wrap justify-around">
        {POKEMON_IMAGE_KEYS.map(
          (imgtype, imgIndex) =>
            pokemonInfo?.sprites[imgtype] && (
              <ImageShadowWrap key={imgIndex}>
                <LazyLoadImage
                  src={pokemonInfo?.sprites[imgtype]}
                  alt={imgtype}
                />
              </ImageShadowWrap>
            )
        )}
      </div>
      <div className="mt-10">
        <Label context="진화 형태(api 요청 해야함)" />
        <div>{pokemonSpeciesInfo?.evolution_chain?.url}</div>
      </div>

      <div className="mt-10">
        <Label
          context={
            lang === "en"
              ? "Pokemon Appearance Transformation by Series"
              : "시리즈별 포켓몬 모습 변천사"
          }
        />
        <PokemonGenerationGallery {...pokemonInfo?.sprites?.versions} />
      </div>
    </div>
  );
};

export default PokemonDetailBox;
