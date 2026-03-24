import type {
  PokemonAll,
  PokemonDetailType,
  PokemonSpecies,
  PokemonTypeResponse,
} from '@/lib/types';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// 임의 PokeAPI URL로 데이터 조회 (진화 체인 등 응답에 포함된 URL 활용)
export async function fetchByUrl<T>(url: string, options?: RequestInit): Promise<T> {
  return fetchApi<T>(url, options);
}

// 포켓몬 상세 정보 조회: 스탯, 타입, 스프라이트, 능력 등 (GET /pokemon/{id or name})
export async function fetchPokemon(
  nameOrId: string,
  options?: RequestInit,
): Promise<PokemonDetailType> {
  return fetchApi<PokemonDetailType>(`${POKEAPI_BASE}/pokemon/${nameOrId}`, options);
}

// 포켓몬 종 정보 조회: 다국어 이름, 도감 설명, 진화 체인 URL, 분류 등 (GET /pokemon-species/{id})
export async function fetchPokemonSpecies(
  id: string,
  options?: RequestInit,
): Promise<PokemonSpecies> {
  return fetchApi<PokemonSpecies>(`${POKEAPI_BASE}/pokemon-species/${id}`, options);
}

// 특정 타입에 속하는 포켓몬 목록 및 타입 다국어 이름 조회 (GET /type/{id or name})
export async function fetchPokemonByType(
  typeId: string,
  options?: RequestInit,
): Promise<PokemonTypeResponse> {
  return fetchApi<PokemonTypeResponse>(`${POKEAPI_BASE}/type/${typeId}`, options);
}

// 포켓몬 목록 페이지네이션 조회, 검색어 입력 시 단일 포켓몬 조회 (GET /pokemon?offset=&limit=20)
export async function fetchPokemonList({
  pageParam = 0,
  search,
  options,
}: {
  pageParam?: number;
  search?: string;
  options?: RequestInit;
}): Promise<PokemonAll | PokemonDetailType> {
  if (search) {
    return fetchApi<PokemonDetailType>(`${POKEAPI_BASE}/pokemon/${search.toLowerCase()}`, options);
  }
  return fetchApi<PokemonAll>(`${POKEAPI_BASE}/pokemon?offset=${pageParam}&limit=20`, options);
}

// 전체 포켓몬 이름 목록 일괄 조회, 검색 인덱스 구축용 (GET /pokemon?limit=100000&offset=0)
export async function fetchAllPokemonNames(options?: RequestInit): Promise<PokemonAll> {
  return fetchApi<PokemonAll>(`${POKEAPI_BASE}/pokemon?limit=100000&offset=0`, options);
}
