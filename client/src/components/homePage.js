import { useState, useEffect } from "react";
import axios from 'axios';
import SearchDropdown from "./features/searchDropdown";
import "../index.css";

function HomePage() {
  const [search, setSearch] = useState('');
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/school/')
      .then((response) => {
        setSchools(response.data.map((university) => university.name));
        console.log(response.data);
      })
      .catch((error) => {
        console.error('API call error:', error);
      });
  }, [search]);

  const handleSearchChange = (newSearch) => {
    console.log("win");
    setSearch(newSearch);
  };

  return (
    <div id="home-container">
      <header id="home-title">Admit_Base</header>
      <div id="searchDropdown-container">
        <SearchDropdown choices={schools} onSearchChange={handleSearchChange} />
      </div>
    </div>
  );
}

export default HomePage;