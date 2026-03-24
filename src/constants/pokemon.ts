export const POKEMON_TYPE_LIST = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
] as const;

export type PokemonTypeName = (typeof POKEMON_TYPE_LIST)[number];

export const POKEMON_TYPE_LABELS_KO: Record<string, string> = {
  normal: '노말',
  fighting: '격투',
  flying: '비행',
  poison: '독',
  ground: '땅',
  rock: '바위',
  bug: '벌레',
  ghost: '고스트',
  steel: '강철',
  fire: '불꽃',
  water: '물',
  grass: '풀',
  electric: '전기',
  psychic: '에스퍼',
  ice: '얼음',
  dragon: '드래곤',
  dark: '악',
  fairy: '페어리',
  unknown: '???',
  shadow: '다크',
};

export const POKEMON_TYPE_BG: Record<string, string> = {
  normal: 'bg-type-normal',
  fighting: 'bg-type-fighting',
  flying: 'bg-type-flying',
  poison: 'bg-type-poison',
  ground: 'bg-type-ground',
  rock: 'bg-type-rock',
  bug: 'bg-type-bug',
  ghost: 'bg-type-ghost',
  steel: 'bg-type-steel',
  fire: 'bg-type-fire',
  water: 'bg-type-water',
  grass: 'bg-type-grass',
  electric: 'bg-type-electric',
  psychic: 'bg-type-psychic',
  ice: 'bg-type-ice',
  dragon: 'bg-type-dragon',
  dark: 'bg-type-dark',
  fairy: 'bg-type-fairy',
  unknown: 'bg-type-unknown',
  shadow: 'bg-type-shadow',
};

export const POKEMON_TYPE_TEXT: Record<string, string> = {
  normal: 'text-type-normal',
  fighting: 'text-type-fighting',
  flying: 'text-type-flying',
  poison: 'text-type-poison',
  ground: 'text-type-ground',
  rock: 'text-type-rock',
  bug: 'text-type-bug',
  ghost: 'text-type-ghost',
  steel: 'text-type-steel',
  fire: 'text-type-fire',
  water: 'text-type-water',
  grass: 'text-type-grass',
  electric: 'text-type-electric',
  psychic: 'text-type-psychic',
  ice: 'text-type-ice',
  dragon: 'text-type-dragon',
  dark: 'text-type-dark',
  fairy: 'text-type-fairy',
  unknown: 'text-type-unknown',
  shadow: 'text-type-shadow',
};

export const POKEMON_IMAGE_KEYS = [
  'front_default',
  'front_female',
  'back_default',
  'back_female',
  'front_shiny',
  'front_shiny_female',
  'back_shiny',
  'back_shiny_female',
] as const;

export type GenerationSection = {
  id:
    | 'generation-i'
    | 'generation-ii'
    | 'generation-iii'
    | 'generation-iv'
    | 'generation-v'
    | 'generation-vi'
    | 'generation-vii';
  label: {
    en: string;
    ko: string;
  };
  items: Array<{
    id: string;
    title: {
      en: string;
      ko: string;
    };
  }>;
};

export const POKEMON_GENERATION_SECTIONS: GenerationSection[] = [
  {
    id: 'generation-i',
    label: { en: 'Generation I', ko: '1 세대' },
    items: [
      {
        id: 'red-blue',
        title: { en: 'Pokémon Red & Blue', ko: '포켓몬스터 레드·블루' },
      },
      {
        id: 'yellow',
        title: { en: 'Pokémon Yellow', ko: '포켓몬스터 옐로' },
      },
    ],
  },
  {
    id: 'generation-ii',
    label: { en: 'Generation II', ko: '2 세대' },
    items: [
      {
        id: 'crystal',
        title: { en: 'Pokémon Crystal', ko: '포켓몬스터 크리스탈' },
      },
      {
        id: 'gold',
        title: { en: 'Pokémon Gold·Silver', ko: '포켓몬스터 골드·실버' },
      },
      {
        id: 'silver',
        title: { en: 'Pokémon Silver', ko: '포켓몬스터 실버' },
      },
    ],
  },
  {
    id: 'generation-iii',
    label: { en: 'Generation III', ko: '3 세대' },
    items: [
      {
        id: 'emerald',
        title: { en: 'Pokémon Emerald', ko: '포켓몬스터 에메랄드' },
      },
      {
        id: 'firered-leafgreen',
        title: {
          en: 'Pokémon FireRed and LeafGreen',
          ko: '포켓몬스터 파이어레드·리프그린',
        },
      },
      {
        id: 'ruby-sapphire',
        title: { en: 'Pokémon Ruby and Sapphire', ko: '포켓몬스터 루비·사파이어' },
      },
    ],
  },
  {
    id: 'generation-iv',
    label: { en: 'Generation IV', ko: '4 세대' },
    items: [
      {
        id: 'diamond-pearl',
        title: {
          en: 'Pokémon Diamond·Pearl',
          ko: '포켓몬스터 디아루가·펄기아',
        },
      },
      {
        id: 'heartgold-soulsilver',
        title: {
          en: 'Pokémon HeartGold·SoulSilver',
          ko: '포켓몬스터 하트골드·소울실버',
        },
      },
      {
        id: 'platinum',
        title: { en: 'Pokémon Platinum', ko: '포켓몬스터 기라티나' },
      },
    ],
  },
  {
    id: 'generation-v',
    label: { en: 'Generation V', ko: '5 세대' },
    items: [
      {
        id: 'black-white',
        title: { en: 'Pokémon Black·White', ko: '포켓몬스터 블랙·화이트' },
      },
    ],
  },
  {
    id: 'generation-vi',
    label: { en: 'Generation VI', ko: '6 세대' },
    items: [
      {
        id: 'omegaruby-alphasapphire',
        title: {
          en: 'Pokémon Omega Ruby·Alpha Sapphire',
          ko: '포켓몬스터 오메가루비·알파사파이어',
        },
      },
      {
        id: 'x-y',
        title: { en: 'Pokémon X·Y', ko: '포켓몬스터 X·Y' },
      },
    ],
  },
  {
    id: 'generation-vii',
    label: { en: 'Generation VII', ko: '7 세대' },
    items: [
      {
        id: 'ultra-sun-ultra-moon',
        title: { en: 'Pokémon Ultra Sun·Ultra Moon', ko: '포켓몬스터 울트라썬·울트라문' },
      },
    ],
  },
];
