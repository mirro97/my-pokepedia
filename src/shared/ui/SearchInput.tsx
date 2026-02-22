import React from "react";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchInput = ({ value, placeholder, onChange, onSearch }: Props) => {
  const write = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="px-5 py-4 rounded-xl shadow-md w-full focus:outline-none"
        onChange={write}
        value={value}
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSearch();
        }}
      />
      <button
        className="absolute right-[15px] top-3 hover:cursor-pointer"
        onClick={onSearch}
      >
        <img src="/images/soothe-bell.png" alt="검색" />
      </button>
    </div>
  );
};

export default SearchInput;
