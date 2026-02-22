export interface PokemonBasic {
  name: string;
  url: string;
}

export interface PokemonAll {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonBasic;
}

export interface PokemonAblities {
  ability: PokemonBasic;
  is_hidden: false;
  slot: number;
}

export interface PokemonLanguage {
  language: PokemonBasic;
}

export interface PokemonGameIndices {
  game_index: string;
  version: PokemonBasic;
}

export interface PokemonVersion {
  rarity: number;
  version: PokemonBasic;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonName {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface PokemonGenera {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

export interface PokemonImgType {
  [key: string]: string; // index signature 추가 -> 객체의 프로퍼티를 읽을 때 string 타입의 key 사용을 허용함
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface PokemonVersionsGeneration {
  "generation-i": { "red-blue": PokemonImgType; yellow: PokemonImgType };
  "generation-ii": {
    crystal: PokemonImgType;
    gold: PokemonImgType;
    silver: PokemonImgType;
  };
  "generation-iii": {
    emerald: PokemonImgType;
    "firered-leafgreen": PokemonImgType;
    "ruby-sapphire": PokemonImgType;
  };
  "generation-iv": {
    "diamond-pearl": PokemonImgType;
    "heartgold-soulsilver": PokemonImgType;
    platinum: PokemonImgType;
  };
  "generation-v": {
    "black-white": { animated: PokemonImgType; front_default: string };
  };
  "generation-vi": {
    "omegaruby-alphasapphire": PokemonImgType;
    "x-y": PokemonImgType;
  };
  "generation-vii": { "ultra-sun-ultra-moon": PokemonImgType };
}

export interface PokemonDetailType {
  abilities: PokemonAblities;
  base_experience: number;
  forms: PokemonBasic;
  game_indices: PokemonGameIndices;
  height: number;
  held_items: {
    items: PokemonBasic;
    version_details: PokemonVersion;
  };
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_types: [];
  species: PokemonBasic;
  sprites: {
    [key: string]: any;
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    versions: PokemonVersionsGeneration;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: PokemonBasic;
  };
  types: PokemonType[];
  weight: number;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: PokemonBasic;
  pokedex_numbers: [];
  egg_groups: PokemonBasic;
  color: PokemonBasic;
  shape: PokemonBasic;
  evolves_from_species: PokemonBasic;
  evolution_chain: {
    url: string;
  };
  habitat: null;
  generation: PokemonBasic;
  names: [];
  flavor_text_entries: [];
  form_descriptions: [];
  genera: PokemonGenera[];
  varieties: [];
}

// Evolution Chain Types
export interface EvolutionDetail {
  item: PokemonBasic | null;
  trigger: PokemonBasic;
  gender: number | null;
  held_item: PokemonBasic | null;
  known_move: PokemonBasic | null;
  known_move_type: PokemonBasic | null;
  location: PokemonBasic | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: PokemonBasic | null;
  party_type: PokemonBasic | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: PokemonBasic | null;
  turn_upside_down: boolean;
}

export interface EvolutionChainLink {
  is_baby: boolean;
  species: PokemonBasic;
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[]; // Recursive
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: PokemonBasic | null;
  chain: EvolutionChainLink;
}
