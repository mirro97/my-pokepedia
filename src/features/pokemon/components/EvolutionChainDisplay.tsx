import { EvolutionChainLink, EvolutionChain, PokemonName } from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { usePokemon, usePokemonSpecies } from "../hooks"; // Add usePokemonSpecies import
import { useLocalizedList } from "@/shared/hooks/useLocalizedList"; // Add useLocalizedList import

interface EvolutionBranchProps {
  evolutionLink: EvolutionChainLink;
}

const EvolutionBranch = ({ evolutionLink }: EvolutionBranchProps) => {
  const { species, evolves_to, evolution_details } = evolutionLink;
  const { data: pokemonData } = usePokemon(species.name);
  const { data: pokemonSpecies } = usePokemonSpecies(species.name); // Fetch species data
  const localizedName = useLocalizedList(pokemonSpecies?.names) as PokemonName[]; // Get localized name

  const getPokemonIdFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const pokemonId = pokemonData ? pokemonData.id : getPokemonIdFromUrl(species.url);

  return (
    <div className="flex flex-col items-center">
      <Link to={`/pokemon/${pokemonId}`}>
        <div className="flex flex-col items-center p-2 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <LazyLoadImage
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={species.name}
            className="w-20 h-20"
          />
          <span className="capitalize font-semibold text-sm mt-1">
            {(localizedName && localizedName[0]?.name) || species.name}
          </span>
        </div>
      </Link>
      {evolution_details && evolution_details.length > 0 && (
        <div className="text-xs text-gray-500 mt-1">
          {evolution_details.map((detail, index) => (
            <span key={index}>
              {detail.min_level ? `Lv ${detail.min_level}` : ""}
              {detail.trigger?.name === "trade" && "Trade"}
              {/* Add more evolution details as needed */}
            </span>
          ))}
        </div>
      )}
      {evolves_to.length > 0 && (
        <div className="flex mt-4 space-x-4">
          {evolves_to.map((nextEvolution, index) => (
            <EvolutionBranch key={index} evolutionLink={nextEvolution} />
          ))}
        </div>
      )}
    </div>
  );
};

interface EvolutionChainDisplayProps {
  evolutionChain: EvolutionChain;
}

const EvolutionChainDisplay = ({ evolutionChain }: EvolutionChainDisplayProps) => {
  if (!evolutionChain?.chain) return <p>No evolution data available.</p>;

  return (
    <div className="flex justify-center p-4">
      <EvolutionBranch evolutionLink={evolutionChain.chain} />
    </div>
  );
};

export default EvolutionChainDisplay;
