import PokemonDetailBox from "@/features/pokemon/components/PokemonDetailBox";
import { useParams } from "react-router-dom";
import { usePokemon, usePokemonSpecies } from "@/features/pokemon/hooks";

const PokemonDetail = () => {
  const { id: pokemonId } = useParams();

  const { data: pokemonInfo } = usePokemon(pokemonId);
  const { data: pokemonSpeciesInfo } = usePokemonSpecies(pokemonId);
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
