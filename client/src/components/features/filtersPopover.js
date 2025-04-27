import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Select,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function FiltersPopover({ onApplyFilters }) {
  const [gpaFilter, setGpaFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleApply = () => {
    onApplyFilters({ gpa: gpaFilter, status: statusFilter });
  };

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button backgroundColor="black" color="white" borderRadius="4px">
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent p={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Filter Applications</PopoverHeader>
        <PopoverBody>
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="Minimum GPA"
              type="number"
              step="0.01"
              value={gpaFilter}
              onChange={(e) => setGpaFilter(e.target.value)}
            />
            <Select
              placeholder="Select Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Accepted">Accepted</option>
              <option value="Waitlisted">Waitlisted</option>
              <option value="Rejected">Rejected</option>
            </Select>
            <Button colorScheme="blue" onClick={handleApply} width="100%">
              Apply Filters
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
