import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Input } from 'antd'

interface SearchFieldProps {
  onSearch: (query: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex mb-2">
      <div className="flex p-1 border border-pastel-orange rounded ">
        <SearchOutlinedIcon style={{ fontSize: 24, color: "#FFCC70" }} />
        <Input
        className={`border-white text-sm`}
        placeholder={'Search...'}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      </div>
    </form>
  );
};

export default SearchField;
