import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <TextField
      label="Search posts by title..."
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
