import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPoketmonListAll } from "../core/apis/pokemon";
import { SetStateAction, useEffect, useState } from "react";
import { Pokemons } from "@/components/pokemon/pokemons";
import SearchTab from "@/components/SearchTab";
import TypeNavigationBar from "@/components/typeNavigationBar";
import { PokemonCard } from "@/components/pokemon/card";
import { useRecoilState } from "recoil";
import { language } from "@/core/recoil/language";
import { GalmuriText } from "@/components/common/text";
import { Button } from "@/components/common/button";

const MainPage = () => {
  const [ref, isView] = useInView();
  const [lang, setLang] = useRecoilState(language);
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const {
    data: pokemonListAll, // data.pages를 갖고 있는 배열
    error, // error 객체
    fetchNextPage: pokemonListAllFetchNextPage, //  다음 페이지를 불러오는 함수
    hasNextPage: pokemonListAllHasNextPage, // 다음 페이지가 있는지 여부, Boolean
    isFetching, // 첫 페이지 fetching 여부, Boolean
    isFetchingNextPage, // 추가 페이지 fetching 여부, Boolean
    status: pokemonListAllStatus, // loading, error, success 중 하나의 상태, string
  } = useInfiniteQuery({
    queryKey: ["pokemonList", search],
    queryFn: ({ pageParam }) => getPoketmonListAll({ pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { next?: string }) => {
      const { next } = lastPage;
      if (!next) return undefined;
      return Number(new URL(next).searchParams.get("offset"));
    },
  });
  console.log(pokemonListAll);

  // 무한 스크롤
  useEffect(() => {
    if (isView && pokemonListAllHasNextPage) pokemonListAllFetchNextPage();
  }, [isView]);

  return (
    <div className="py-24 px-4 sm:px-12 flex-1">
      <SearchTab input={input} setInput={setInput} setSearch={setSearch} />
      <TypeNavigationBar />
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
              <div className="w-full mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {pokemonListAll.pages.map((group: any, index: number) => (
                  <Pokemons key={index} pokemons={group.results ?? []} />
                ))}
                <div ref={ref} />
              </div>
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
              <div className="w-full mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {pokemonListAll.pages.map((group: any, index: number) => (
                  <PokemonCard key={index} pokemonIndex={group.name ?? group.results?.[0]?.name ?? ""} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
