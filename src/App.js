import React from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import Data from "./data.json";

function App() {
  return (
    <div className="App">
      <SearchBar placeholder="Enter a character" data={Data} />
    </div>
  );
}

export default App;