import { HStack, VStack, Heading, Box, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";

function LoginPage() {
    return (
      <HStack>
        <VStack>
            <Box>
                <Heading>Welcome to Admit Base</Heading>
            </Box>
            <Box>
                <FormControl>
                    <Input />
                    <FormErrorMessage></FormErrorMessage>
                </FormControl>
            </Box>
        </VStack>
        <VStack>
            images
        </VStack>
      </HStack>
    )
  }
  
  export default LoginPage;
