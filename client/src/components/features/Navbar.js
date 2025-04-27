import { Box, Button, Heading, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import axios from 'axios';
import { useAuthContext } from "../../contexts/hooks/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";


function Navbar() {
    const navigate = useNavigate();
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
        <Box
            backgroundColor={"#F7FAFC"}
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingLeft={"45px"}
            paddingRight={"45px"}
            paddingTop={"12px"}
            paddingBottom={"12px"}
            boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}
        >
            <Link to="/" textDecoration={"none"}>
                <Heading fontStyle={"italic"} fontSize={"30px"}>Admit_Base</Heading>
            </Link>
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
                    {/* <Button onClick={handleLogout}>Log Out</Button>
                    <FaCircleUser fontSize="30px" /> */}
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
                    >Log In
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
  );
}

export default Navbar;
