import { useState, useEffect } from "react";
import axios from 'axios';
import SearchDropdown from "./features/searchDropdown";

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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
    }}>
      <title>Admit_Base</title>
      <header>Admit_Base</header>
      <div width="md" style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchDropdown choices={schools} onSearchChange={handleSearchChange} />
      </div>
    </div>
  );
}

export default HomePage;