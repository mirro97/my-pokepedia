import type { PokemonDetailType } from '@/lib/types';

/**
 * PokeAPI URL에서 포켓몬 ID를 추출한다.
 * 예: "https://pokeapi.co/api/v2/pokemon/25/" → "25"
 */
export const extractIdFromUrl = (url: string): string => {
  return url.split('/').filter(Boolean).pop() ?? '';
};

/**
 * 포켓몬의 애니메이션 스프라이트 URL을 반환한다.
 * 5세대 애니메이션이 없으면 기본 front_default를 반환한다.
 */
export const getAnimatedSpriteUrl = (pokemon?: PokemonDetailType): string | undefined => {
  return pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default
    || pokemon?.sprites?.front_default;
};

/**
 * 5세대 애니메이션 스프라이트가 있는지 확인한다.
 */
export const hasAnimatedSprite = (pokemon?: PokemonDetailType): boolean => {
  return !!pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default;
};

/**
 * 문자열이 숫자로만 이루어져 있는지 확인한다.
 */
export const isNumericOnly = (value: string): boolean => /^\d+$/.test(value);

/**
 * 에러 객체에서 HTTP 상태 코드를 추출한다.
 */
export const getErrorStatus = (error: unknown): number | undefined => {
  if (!error || typeof error !== 'object') return undefined;
  return (error as { response?: { status?: number } }).response?.status;
};
