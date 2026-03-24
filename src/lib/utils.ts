import type { PokemonDetailType, PokemonSpecies } from '@/lib/types';

// PokeAPI URL에서 포켓몬 ID 추출
export const extractIdFromUrl = (url: string): string => {
  return url.split('/').filter(Boolean).pop() ?? '';
};

// 5세대 애니메이션 스프라이트 URL 반환, 없으면 기본 스프라이트
export const getAnimatedSpriteUrl = (pokemon?: PokemonDetailType): string | undefined => {
  return (
    pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default ||
    pokemon?.sprites?.front_default
  );
};

// 5세대 애니메이션 스프라이트 존재 여부 확인
export const hasAnimatedSprite = (pokemon?: PokemonDetailType): boolean => {
  return !!pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default;
};

// 문자열이 숫자로만 이루어져 있는지 확인
export const isNumericOnly = (value: string): boolean => /^\d+$/.test(value);

// 에러 객체에서 HTTP 상태 코드 추출
export const getErrorStatus = (error: unknown): number | undefined => {
  if (!error || typeof error !== 'object') return undefined;
  return (error as { response?: { status?: number } }).response?.status;
};

// 포켓몬/종 데이터에서 현재 언어에 맞는 이름, 설명, 이미지를 추출
export const getLocalizedPokemonInfo = (
  pokemon: PokemonDetailType,
  species: PokemonSpecies,
  language: string,
) => {
  const name = species.names?.find((n) => n.language.name === language)?.name || pokemon.name;
  const description =
    species.flavor_text_entries
      ?.find((f) => f.language.name === language)
      ?.flavor_text?.replace(/\n/g, ' ') || '';
  const image =
    pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;
  return { name, description, image };
};
