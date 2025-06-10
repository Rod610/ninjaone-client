import { useEffect, useState } from "react";

import SearchIcon from "../../../../../assets/ActionIcons/SearchIcon.svg?react";
import { useDevices } from "../../../../../hooks/useDevices";


const SearchBar = () => {
  const { setSearch } = useDevices();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delay = 200; // 200ms delay
    const timeout = setTimeout(() => {
      setSearch(inputValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inputValue, setSearch]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 min-w-[270px]">
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Search"
        onChange={onChangeHandler}
        className="col-start-1 row-start-1 block rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#6E6D7A] focus:outline-2 focus:-outline-offset-2 sm:pl-9 sm:text-sm/6"
      />
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 ml-3 self-center text-gray-400 sm:size-4"
      />
    </div>
  );
};

export default SearchBar;
