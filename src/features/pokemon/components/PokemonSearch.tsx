import React from "react";
import SearchInput from "@/shared/ui/SearchInput";
import { useLanguageValue } from "@/shared/hooks/useLanguage";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const PokemonSearch = ({ input, setInput, setSearch }: Props) => {
  const { lang } = useLanguageValue();
  const placeholder =
    lang === "en"
      ? "Search Pokemon With Name or Id!"
      : "포켓몬 이름 또는 아이디를 입력해주세요!";

  return (
    <div className="mx-auto max-w-3xl py-4">
      <SearchInput
        value={input}
        placeholder={placeholder}
        onChange={setInput}
        onSearch={() => setSearch(input)}
      />
    </div>
  );
};

export default PokemonSearch;
