import React, { useState } from "react";

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  return (
    <form className="search">
      <input className = 'input'
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input className = 'inputa' onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>

    
  );
};

export default Search;