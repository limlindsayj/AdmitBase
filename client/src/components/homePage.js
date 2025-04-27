import { Box, Button, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from 'axios';
import SearchDropdown from "./features/searchDropdown";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../contexts/hooks/AuthContext";
import "../index.css";
// import { checkNavigable } from "react-slick/lib/utils/innerSliderUtils";

function HomePage() {
  const [search, setSearch] = useState('');
  const [schools, setSchools] = useState([]);
  // const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await axios.post('http://localhost:3001/login/logout', {}, { withCredentials: true });
      
  //     setIsLoggedIn(false);
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  useEffect(() => {
    axios.get('http://localhost:3001/school')
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
    <Box
      width={"100%"}
      height={"90vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading
        fontFamily={"SF Pro Text"}
        fontStyle={"italic"}
        fontSize={"64px"}
        fontWeight={"normal"}
        margin={"22px"}
      >
        Admit_Base
      </Heading>
      <SearchDropdown choices={schools} onSearchChange={handleSearchChange} />
    </Box>
  );
}

export default HomePage;