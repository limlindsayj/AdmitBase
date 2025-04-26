import { HStack, VStack, Heading, Box, Input, FormControl, FormErrorMessage, Button, Text, Image } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
    return (
      <HStack>
        <VStack 
            width={"50%"}
            height={"100vh"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
            justifyContent={"space-between"}
            padding={"5%"}
        >
            <Box 
                width={"50%"}
            >
                <Heading fontFamily={"inter"}>Welcome to Admit_Base!</Heading>
            </Box>
            <Box
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <FormControl
                    marginBottom={"15px"}
                >
                    <Input 
                        placeholder="Username"
                        // type="email"
                        size={"lg"}
                        borderRadius={"3"}
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
                    />
                    <FormErrorMessage></FormErrorMessage>
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
        <VStack>
            <Image src={"/images/universities.png"}></Image>
        </VStack>
      </HStack>
    )
  }
  
  export default LoginPage;
