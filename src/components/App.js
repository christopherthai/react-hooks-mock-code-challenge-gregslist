import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {

  const [search, setSearch] = useState("")

  const handleSearch = (input) => {
    setSearch(input)
  }

  return (
    <div className="app">
      <Header handleSearch={handleSearch} />
      <ListingsContainer onSearch={search} />
    </div>
  );
}

export default App;
