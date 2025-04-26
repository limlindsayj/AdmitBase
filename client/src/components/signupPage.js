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
      <VStack>
        <Box>
          <Heading>Welcome to Admit Base</Heading>
        </Box>
        <Box>
          <InformationForm />
        </Box>
      </VStack>
      <VStack>images</VStack>
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

        navigate("/inpage");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <Box w="100%">
      <VStack spacing={4}>
        {hasFormError && (
          <FormControl isInvalid mt={2}>
            <FormErrorMessage>
              Please fill out all required fields.
            </FormErrorMessage>
          </FormControl>
        )}
        <HStack w="100%">
          <FormControl isInvalid={isFirstNameError}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {isFirstNameError && (
              <FormErrorMessage>First name is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isLastNameError}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {isLastNameError && (
              <FormErrorMessage>Last name is required.</FormErrorMessage>
            )}
          </FormControl>
        </HStack>

        <FormControl isInvalid={isEmailError}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isEmailError && (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isPasswordError}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
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

        <Button colorScheme="blue" w="100%" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
}

export default SignupPage;
