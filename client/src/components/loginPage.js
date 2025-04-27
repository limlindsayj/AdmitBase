import { HStack, VStack, Heading, Box, Input, FormControl, FormErrorMessage, Button, Text, Image } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/hooks/AuthContext";  // <-- add this




function LoginPage() {
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const { setIsLoggedIn } = useAuthContext();


    const handleLogin = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email);
        console.log(password);

        try{
            const response = await axios.post('http://localhost:3001/login', {email, password}, {withCredentials: true});
            console.log('login successful: ', response.data);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error){
            console.error('Login error:', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid username or password.');
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
        }
    };
    return (
      <HStack>
        <VStack 
            width={"50%"}
            height={"100vh"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
            justifyContent={"space-evenly"}
            padding={"5%"}
        >
            <Box >
                <Heading fontSize={"50px"} fontWeight={"700"} >Welcome to</Heading>
                <Heading fontSize={"50px"} fontWeight={"700"} fontStyle={"italic"}>Admit_Base!</Heading>
            </Box>
            <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                as="form"
                onSubmit={handleLogin}
            >
                <FormControl
                    marginBottom={"15px"}
                >
                    <Input 
                        placeholder="Email"
                        type="email"
                        size={"lg"}
                        borderRadius={"3"}
                        ref={emailRef}
                    />
                    <FormErrorMessage></FormErrorMessage>
                </FormControl>
                <FormControl
                    marginBottom={"15px"}
                >
                    <Input 
                        placeholder="Password"
                        type="password"
                        size={"lg"}
                        borderRadius={"3"}
                        ref={passwordRef}
                    />
                    {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
                </FormControl>
                <Button
                    width={'100%'}
                    type="submit"
                    color={"white"}
                    backgroundColor={"black"}
                    borderRadius={"3"}
                >
                    LOG IN
                </Button>
                <Text margin={"15px"}> OR </Text>
                <Button
                    width={'100%'}
                    type="submit"
                    color={"white"}
                    backgroundColor={"black"}
                    borderRadius={"3"}
                >
                    <FcGoogle /> <Text paddingLeft={"15px"}>SIGN IN WITH GOOGLE</Text>
                </Button>
            </Box>
            <Box></Box>
        </VStack>
        <Box
            backgroundImage="url('/images/universities.png')"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            width="50%"
            height="100vh"
        />
      </HStack>
    )
  }
  
  export default LoginPage;
