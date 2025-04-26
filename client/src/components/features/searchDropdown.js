import { Box, Input, VStack, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SearchDropdown({ choices = [], onSearchChange }) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredChoices = choices.filter((choice) =>
    choice.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)
      ) {
        onSearchChange("hello");
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <VStack p={4} spacing={1}  align="stretch" position="relative">
      <Input
        width="100%"
        ref={inputRef}
        value={search}
        placeholder="Search..."
        focusBorderColor="black"
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              border="1px solid #ccc"
              borderRadius="md"
              boxShadow="md"
              bg="white"
              zIndex="dropdown"
              maxHeight="200px"
              overflowY="auto"
              position="absolute"
              top="100%"
              left={0}
              width="100%"
              height="auto"
            >
              {filteredChoices.length > 0 ? (
                filteredChoices.map((choice, index) => (
                  <Box
                    key={index}
                    p={2}
                    _hover={{ backgroundColor: "gray.100" }}
                    cursor="pointer"
                    onMouseDown={() => {
                      setSearch(choice);
                      onSearchChange(choice);
                      setIsOpen(false);
                    }}
                  >
                    {choice}
                  </Box>
                ))
              ) : (
                <Text p={2} color="gray.500">No results found</Text>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </VStack>
  );
}

export default SearchDropdown;