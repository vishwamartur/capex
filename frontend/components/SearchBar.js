import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "reactstrap";

const SearchBar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/items/search?q=${searchTerm}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setSearchResults(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="search-bar">
      <Input
        type="text"
        placeholder="Search for items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
