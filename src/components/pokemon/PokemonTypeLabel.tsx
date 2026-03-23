'use client';

import { useLang } from "@/lib/use-lang";
import {
  POKEMON_TYPE_BG,
  POKEMON_TYPE_LABELS_KO,
} from "@/constants/pokemon";
import { PokemonType } from "@/lib/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/navigation";

interface PokemonTypeProps {
  typeData: PokemonType;
  onClick?: () => void;
}

const PokemonTypeLabel = ({ typeData, onClick }: PokemonTypeProps) => {
  const lang = useLang();
  const router = useRouter();
  const typeName = typeData?.type?.name;
  const label =
    lang === "en" ? typeName : POKEMON_TYPE_LABELS_KO[typeName] ?? typeName;

  return (
    <button
      onClick={onClick ?? (() => router.push(`/${lang}/pokemon/type/${typeName}`))}
      className={`flex justify-center group-[.is-card]:flex-1 group-[.is-tab]:m-1 group-[.is-tab]:w-fit px-[26px] w-1/2 py-3px type-label mr-1 font-semibold ${
        typeName ? POKEMON_TYPE_BG[typeName] : ""
      }`}
      key={typeName}
    >
      {typeName !== "unknown" && typeName !== "shadow" && (
        <LazyLoadImage
          key={typeName}
          src={`/images/pokemon-type-images/${typeName}.svg`}
          alt={typeName}
          className="mr-1"
          width={20}
        />
      )}
      <span className="text-sm">{label}</span>
    </button>
  );
};

export default PokemonTypeLabel;
