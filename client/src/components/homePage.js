import { useState, useEffect } from "react";
import axios from 'axios';
import SearchDropdown from "./features/searchDropdown";
import { useNavigate } from 'react-router-dom';
import "../index.css";

function HomePage() {
  const [search, setSearch] = useState('');
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/school/')
      .then((response) => {
        setSchools(response.data.map((university) => university.name));
      })
      .catch((error) => {
        console.error('API call error:', error);
      });
  }, [search]);

  const handleSearchChange = (newSearch) => {
    console.log(newSearch);
    navigate("/college", { state: newSearch });
    setSearch(newSearch);
  };

  return (
    <>
    <div className="in-buttons">
      <button id="login-button" onClick={() => navigate("/inpage", { state: true })}>Log In</button>
      <button id="signin-button" onClick={() => navigate("/signup", { state: false })}>Sign In</button>
    </div>
    
    <div id="home-container">
      <header id="home-title">Admit_Base</header>
      <div id="searchDropdown-container">
        <SearchDropdown choices={schools} onSearchChange={handleSearchChange} />
      </div>
    </div>
    </>
  );
}

export default HomePage;