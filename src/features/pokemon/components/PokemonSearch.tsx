import SearchInput from "@/shared/ui/SearchInput";
import { useTranslations } from "@/shared/hooks/useTranslations";

interface Props {
  input: string;
  setInput: (value: string) => void;
  onImmediateSearch: () => void;
}

const PokemonSearch = ({ input, setInput, onImmediateSearch }: Props) => {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-3xl py-4">
      <SearchInput
        value={input}
        placeholder={t("searchPokemonPlaceholder")}
        onChange={setInput}
        onSearch={onImmediateSearch}
      />
    </div>
  );
};

export default PokemonSearch;
