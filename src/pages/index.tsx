import { useInView } from "react-intersection-observer";
import { useEffect, useState, useMemo } from "react";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";
import PokemonSearch from "@/features/pokemon/components/PokemonSearch";
import PokemonTypeNav from "@/features/pokemon/components/PokemonTypeNav";
import { PokemonCardList, PokemonGrid } from "@/features/pokemon/components/PokemonGrid";
import { Button } from "@/shared/ui/Button";
import {
  usePokemonList,
  usePokemonSearchIndex,
  usePokemonSearchResults,
} from "@/features/pokemon/hooks";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

const MAX_SEARCH_RESULTS = 20;

const isNumericOnly = (value: string) => /^\d+$/.test(value);

const getErrorStatus = (error: unknown) => {
  if (!error || typeof error !== "object") return undefined;
  return (error as { response?: { status?: number } }).response?.status;
};

const MainPage = () => {
  const [ref, isView] = useInView();
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const t = useTranslations();

  // 디바운스: 타이핑 300ms 후 자동 검색
  const debouncedInput = useDebouncedValue(input, 300);
  useEffect(() => {
    const normalized = debouncedInput.trim().toLowerCase();
    setSearch(normalized);
  }, [debouncedInput]);

  // Enter/버튼 클릭 시 즉시 검색
  const handleImmediateSearch = () => {
    const normalized = input.trim().toLowerCase();
    setSearch(normalized);
  };

  // 검색 인덱스에서 부분 매칭
  const searchIndex = usePokemonSearchIndex();
  const matchedIds = useMemo(() => {
    if (!search || isNumericOnly(search)) return [];
    return searchIndex
      .filter((entry) => entry.name.includes(search))
      .slice(0, MAX_SEARCH_RESULTS)
      .map((entry) => entry.id);
  }, [search, searchIndex]);

  // 부분 매칭 결과 조회
  const searchResults = usePokemonSearchResults(matchedIds);

  // 숫자 ID 검색일 때 기존 동작 유지
  const isIdSearch = !!search && isNumericOnly(search);

  // 기본 목록 (무한 스크롤)
  const {
    data: pokemonListAll,
    fetchNextPage,
    hasNextPage,
    status: listStatus,
    error: listError,
  } = usePokemonList(isIdSearch ? search : "");

  useEffect(() => {
    if (isView && hasNextPage && !search) fetchNextPage();
  }, [isView, fetchNextPage, hasNextPage, search]);

  // 검색 상태 판별
  const isSearching = !!search && !isIdSearch;
  const isSearchLoading = isSearching && searchIndex.length === 0;
  const hasNoResults = isSearching && searchIndex.length > 0 && matchedIds.length === 0;

  return (
    <div className="py-24 px-4 sm:px-12 flex-1">
      <PokemonSearch
        input={input}
        setInput={setInput}
        onImmediateSearch={handleImmediateSearch}
      />
      <PokemonTypeNav />
      <div className="flex justify-center">
        {/* 기본 목록 (검색 없을 때) */}
        {!search && (
          <>
            {listStatus === "pending" && <p>{t("loading")}</p>}
            {listStatus === "success" && (
              <PokemonGrid sentinelRef={ref}>
                {pokemonListAll.pages.map((group: any, index: number) => (
                  <PokemonCardList key={index} pokemons={group.results ?? []} />
                ))}
              </PokemonGrid>
            )}
          </>
        )}

        {/* ID 검색 (기존 동작) */}
        {isIdSearch && (
          <>
            {listStatus === "pending" && <p>{t("searching")}</p>}
            {listStatus === "error" && (
              <div className="flex flex-col items-center">
                <p className="mb-14">
                  {getErrorStatus(listError) === 404 ? t("noResults") : t("searchFailed")}
                </p>
                <Button onClick={() => { setInput(""); setSearch(""); }}>{t("searchAll")}</Button>
              </div>
            )}
            {listStatus === "success" && (
              <PokemonGrid>
                {pokemonListAll.pages.map((group: any, index: number) => (
                  <PokemonCard
                    key={index}
                    pokemonIndex={group.name ?? group.results?.[0]?.name ?? ""}
                  />
                ))}
              </PokemonGrid>
            )}
          </>
        )}

        {/* 부분 검색 결과 */}
        {isSearching && (
          <>
            {isSearchLoading && <p>{t("searching")}</p>}
            {hasNoResults && (
              <div className="flex flex-col items-center">
                <p className="mb-14">{t("noResults")}</p>
                <Button onClick={() => { setInput(""); setSearch(""); }}>{t("searchAll")}</Button>
              </div>
            )}
            {matchedIds.length > 0 && (
              <PokemonGrid>
                {searchResults.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemonIndex={pokemon.name} />
                ))}
              </PokemonGrid>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
