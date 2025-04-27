import {
  HStack,
  VStack,
  Heading,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
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
        <Box>
          <Heading fontSize={"50px"} fontWeight={"700"} >Welcome to</Heading>
          <Heading fontSize={"50px"} fontWeight={"700"} fontStyle={"italic"}>Admit_Base!</Heading>
        </Box>
        <Box 
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <InformationForm />
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
  );
}

function InformationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const isFirstNameError = submitted && firstName === "";
  const isLastNameError = submitted && lastName === "";
  const isEmailError = submitted && email === "";
  const isPasswordError = submitted && password === "";

  const hasFormError =
    isFirstNameError || isLastNameError || isEmailError || isPasswordError;

  const handleSubmit = async () => {
    setSubmitted(true);

    if (!hasFormError) {
      try {
        const response = await axios.post("http://localhost:3001/create-user", {
          name: firstName + " " + lastName,
          email,
          password,
        });

        console.log("Form submitted successfully:", response.data);

        navigate("/login-page");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <Box w="100%">
      <VStack spacing={4}>
        <HStack w="100%">
          <FormControl isInvalid={isFirstNameError}>
            <Input
              type="text"
              placeholder="First Name"
              borderRadius={"3"}
              size="lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {isFirstNameError && (
              <FormErrorMessage>First name is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isLastNameError}>
            <Input
              type="text"
              placeholder="Last Name"
              borderRadius={"3"}
              size="lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {isLastNameError && (
              <FormErrorMessage>Last name is required.</FormErrorMessage>
            )}
          </FormControl>
        </HStack>

        <FormControl isInvalid={isEmailError}>
          <Input
            type="email"
            placeholder="Email"
            borderRadius={"3"}
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isEmailError && (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isPasswordError}>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              size="lg"
              borderRadius={"3"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <ViewOffIcon fontSize={"25px"} marginTop={"8px"} marginRight={"10px"}/> : <ViewIcon fontSize={"25px"} marginTop={"8px"} marginRight={"10px"}/>}
                onClick={() => setShowPassword(!showPassword)}
                _hover={{ bg: "transparent" }}
                _focus={{ boxShadow: "none" }}
              />
            </InputRightElement>
          </InputGroup>
          {isPasswordError && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>

        <Button 
            width={'100%'}
            type="submit"
            color={"white"}
            backgroundColor={"black"}
            borderRadius={"3"}
            onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
}

export default SignupPage;
