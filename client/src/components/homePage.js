import { Box, Button, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from 'axios';
import SearchDropdown from "./features/searchDropdown";
import { useNavigate } from 'react-router-dom';
import "../index.css";
import { checkNavigable } from "react-slick/lib/utils/innerSliderUtils";

function HomePage() {
  const [search, setSearch] = useState('');
  const [schools, setSchools] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/login/logout', {}, { withCredentials: true });
      
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3001/login/check-session', { withCredentials: true });
        console.log("response", response.data);
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setIsLoggedIn(false);
        }
        console.error('Session check error:', err);
      }
    }

    checkSession();
  }, []);

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
    <Box>
      <Box
        width={"100%"}
        height={"10vh"}
        display={"flex"}
        justifyContent={"flex-end"}
        paddingRight={"45px"}
        paddingTop={"16px"}
      >
      {isLoggedIn ? (
        <Button onClick={handleLogout}>Log Out</Button>
      ) : (
        <Box>
          <Button 
            onClick={() => navigate("/inpage", {state: true})}
            margin={"4px"}
            borderRadius={"4px"}
            border={"1px"}
            backgroundColor={"white"}
            color={"black"}
          >Log In
          </Button>
          <Button 
            onClick={() => navigate("/inpage", {state: false})}
            margin={"4px"}
            borderRadius={"4px"}
            backgroundColor={"black"}
            color={"white"}
          >
            Sign In
            </Button>
          </Box>
      )}
      </Box>
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
    </Box>
  );
}

export default HomePage;