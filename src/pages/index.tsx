import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";
import PokemonSearch from "@/features/pokemon/components/PokemonSearch";
import PokemonTypeNav from "@/features/pokemon/components/PokemonTypeNav";
import { PokemonCardList, PokemonGrid } from "@/features/pokemon/components/PokemonGrid";
import { useLanguageState } from "@/shared/hooks/useLanguage";
import { GalmuriText } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { usePokemonList } from "@/features/pokemon/hooks";

const MainPage = () => {
  const [ref, isView] = useInView();
  const [lang] = useLanguageState();
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const {
    data: pokemonListAll,
    fetchNextPage: pokemonListAllFetchNextPage,
    hasNextPage: pokemonListAllHasNextPage,
    status: pokemonListAllStatus,
  } = usePokemonList(search);

  // 무한 스크롤
  useEffect(() => {
    if (isView && pokemonListAllHasNextPage) pokemonListAllFetchNextPage();
  }, [isView, pokemonListAllFetchNextPage, pokemonListAllHasNextPage]);

  return (
    <div className="py-24 px-4 sm:px-12 flex-1">
      <PokemonSearch input={input} setInput={setInput} setSearch={setSearch} />
      <PokemonTypeNav />
      <div className="flex justify-center">
        {/* 기본 홈 진입시 pokemonListAll*/}
        {!search && (
          <>
            {pokemonListAllStatus === "pending" && (
              <GalmuriText>
                {lang.lang === "en" && "Loading ... "}
                {lang.lang === "ko" && "불러오는 중 ..."}
              </GalmuriText>
            )}
            {/* {status === "error" && <p>{error?.message}</p>} */}
            {pokemonListAllStatus === "success" && (
              <PokemonGrid sentinelRef={ref}>
                {pokemonListAll.pages.map((group: any, index: number) => (
                  <PokemonCardList key={index} pokemons={group.results ?? []} />
                ))}
              </PokemonGrid>
            )}
          </>
        )}

        {/* 검색 결과 */}
        {!!search && (
          <>
            {pokemonListAllStatus === "pending" && (
              <GalmuriText>
                {lang.lang === "en" && "Searching ... "}
                {lang.lang === "ko" && "검색 중 ..."}
              </GalmuriText>
            )}
            {pokemonListAllStatus === "error" && (
              <div className="flex flex-col items-center">
                <GalmuriText className="mb-14">
                  {lang.lang === "en" && "No Results! Search Again"}
                  {lang.lang === "ko" &&
                    "검색 결과가 없습니다! 다시 검색해주세요"}
                </GalmuriText>
                <Button onClick={() => setSearch("")}>
                  {lang.lang === "en" && "Search All "}
                  {lang.lang === "ko" && "전체 검색"}
                </Button>
              </div>
            )}
            {pokemonListAllStatus === "success" && (
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
      </div>
    </div>
  );
};

export default MainPage;
