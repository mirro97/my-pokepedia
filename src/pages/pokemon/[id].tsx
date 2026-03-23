import PokemonDetailBox from "@/features/pokemon/components/PokemonDetailBox";
import { useParams, useNavigate } from "react-router-dom";
import { usePokemon, usePokemonSpecies } from "@/features/pokemon/hooks";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { Button } from "@/shared/ui/Button";

const PokemonDetail = () => {
  const { id: pokemonId } = useParams();
  const navigate = useNavigate();
  const t = useTranslations();

  const {
    data: pokemonInfo,
    isLoading: isPokemonLoading,
    isError: isPokemonError,
  } = usePokemon(pokemonId);
  const {
    data: pokemonSpeciesInfo,
    isLoading: isSpeciesLoading,
  } = usePokemonSpecies(pokemonId);

  if (isPokemonLoading || isSpeciesLoading) {
    return (
      <div className="max-w-screen-lg mx-auto py-24 px-5 flex justify-center">
        <p>{t("loading")}</p>
      </div>
    );
  }

  if (isPokemonError || !pokemonInfo) {
    return (
      <div className="max-w-screen-lg mx-auto py-24 px-5 flex flex-col items-center">
        <p className="mb-14">{t("noResults")}</p>
        <Button onClick={() => navigate("/")}>{t("searchAll")}</Button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto py-24 px-5">
      <PokemonDetailBox
        pokemonInfo={pokemonInfo}
        pokemonSpeciesInfo={pokemonSpeciesInfo}
      />
    </div>
  );
};

export default PokemonDetail;
