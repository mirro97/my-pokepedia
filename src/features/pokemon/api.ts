import axios from "@/plugins/axios";

export const fetchByUrl = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const fetchPokemon = async (nameOrId: string) => {
  const response = await axios.get(`/pokemon/${nameOrId}`);
  return response.data;
};

const OFFSET = 19;
export const fetchPokemonList = async ({
  pageParam = 0,
  search,
}: {
  pageParam?: number;
  search?: string;
}) => {
  if (search) {
    const response = await axios.get(`/pokemon/${search}`);
    return response.data;
  }

  const response = await axios.get(`/pokemon`, {
    params: { limit: OFFSET, offset: pageParam },
  });
  return response.data;
};

export const fetchPokemonByType = async (typeId: string) => {
  const response = await axios.get(`/type/${typeId}`);
  return response.data;
};

export const fetchPokemonSpecies = async (id: string) => {
  const response = await axios.get(`/pokemon-species/${id}`);
  return response.data;
};
