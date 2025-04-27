import { Box, Input, VStack, Text, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch } from "react-icons/io5";

function SearchDropdown({ choices = [], onSearchChange, value, allowResetOnBlur, borderRadius = "4px" }) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredChoices = choices.filter((choice) =>
    (choice ?? "").toLowerCase().includes((search).toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)
      ) {
        setSearch(''); // always clear search when clicking outside
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setIsOpen(true);
  };

  const handleChoiceSelect = (choice) => {
    if (onSearchChange) {
      onSearchChange(choice);
    }
    setSearch(''); // clear search when a choice is selected
    setIsOpen(false);
  };

  return (
    <VStack spacing={1} align="stretch" position="relative">
      <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<IoSearch color="black" />}
      />
      <Input
        width="100%"
        border={"2px solid #000"}
        borderRadius={borderRadius}
        ref={inputRef}
        value={search !== '' ? search : (value ?? '')}
        placeholder="Search..."
        focusBorderColor="black"
        onFocus={() => setIsOpen(true)}
        onChange={handleInputChange}
        onB
        lur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      </InputGroup>

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
            >
              {filteredChoices.length > 0 ? (
                filteredChoices.map((choice, index) => (
                  <Box
                    key={index}
                    p={2}
                    _hover={{ backgroundColor: "gray.100" }}
                    cursor="pointer"
                    onMouseDown={() => handleChoiceSelect(choice)}
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