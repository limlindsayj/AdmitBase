import { Box, Heading, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FaCircleUser } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from 'axios';
import SearchDropdown from "./features/searchDropdown";
import { useAuthContext } from "../contexts/hooks/AuthContext";
import { useNavigate } from 'react-router-dom';
import "../index.css";

function HomePage() {
  const [search, setSearch] = useState('');
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

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

  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    
  const handleLogout = async () => {
      try {
        await axios.post('http://localhost:3001/login/logout', {}, { withCredentials: true });
        
        setIsLoggedIn(false);
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

  return (
    <Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        paddingLeft={"45px"}
        paddingRight={"45px"}
        paddingTop={"12px"}
        paddingBottom={"12px"}
      >
        {isLoggedIn ? (
          <Box display="flex" alignItems="center" gap="12px">
            <Menu>
              <MenuButton
                as={Box}
                cursor="pointer"
              >
                <FaCircleUser fontSize="30px" />
                </MenuButton>
                  <MenuList border={"2px solid #000"}>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </MenuList>
            </Menu>
          </Box>
          ) : (
          <Box>
            <Button 
              onClick={() => navigate("/login-page", {state: true})}
              margin={"4px"}
              borderRadius={"4px"}
              border={"1px"}
              backgroundColor={"white"}
              color={"black"}
            >
              Log In
            </Button>
            <Button 
              onClick={() => navigate("/signup-page", {state: false})}
              margin={"4px"}
              borderRadius={"4px"}
              backgroundColor={"black"}
              color={"white"}
            >
              Sign Up
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