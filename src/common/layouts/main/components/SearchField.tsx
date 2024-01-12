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
      <div className="flex p-1.5 border border-pastel-orange rounded ">
        <SearchOutlinedIcon style={{ fontSize: 26, color: "#FFCC70", paddingTop: 6 }} />
        <Input
        className={`border-white text-sm w-96`}
        placeholder={'Search...'}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      </div>
    </form>
  );
};

export default SearchField;
