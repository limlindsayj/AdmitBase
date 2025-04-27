import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  VStack,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";


function SubmitApplicationPage() {
  const [formData, setFormData] = useState({
    essayName: "",
    essay: "",
    college: "",
    major: "",
    gpa: "",
    status: "",
    yearApplied: "",
    classes: "",
    additionalInfo: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFields = () => {
    return (
      formData.college.trim() !== "" &&
      formData.essay.trim() !== "" &&
      formData.major.trim() !== "" &&
      formData.gpa.trim() !== "" &&
      formData.status.trim() !== "" &&
      formData.yearApplied.trim() !== "" &&
      formData.classes.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateFields()) {
      return;
    }

    const payload = {
      ...formData,
      gpa: parseFloat(formData.gpa),
      yearApplied: parseInt(formData.yearApplied),
      classes: formData.classes.split(",").map((c) => c.trim()),
    };

    try {
      const response = await fetch("http://localhost:3001/submit-stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Submitted data:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack 
          margin={"60px"} 
          // backgroundColor={"green"} 
        >
          <FormControl isInvalid={submitted && formData.essayName.trim() === ""} width={"65%"}>
            <Input
              type="text"
              borderRadius={"4px"}
              marginBottom={"15px"}
              borderColor="1px solid var(--Secondary-4, #718096)" 
              name="essayName"
              placeholder="Essay Title"
              value={formData.essayName}
              onChange={handleChange}
            />
            <FormErrorMessage>Essay Title Required.</FormErrorMessage>
          </FormControl>
          <FormControl 
            isInvalid={submitted && formData.essay.trim() === ""}
            marginTop={"15px"}
            marginBottom={"15px"}
          >
            <Textarea
              name="essay"
              borderColor="1px solid var(--Secondary-4, #718096)" 
              rows={16}
              borderRadius={"4px"}
              placeholder="Paste your essay..."
              value={formData.essay}
              onChange={handleChange}
            />
            <FormErrorMessage>Essay is required.</FormErrorMessage>
          </FormControl>

          <Box 
            border="1px solid" 
            borderColor="1px solid var(--Secondary-4, #718096)" 
            borderRadius="4px"
            marginTop={"15px"}
            marginBottom={"15px"}
            paddingTop={"10px"}
            paddingBottom={"10px"}
            width="100%"
            height={"auto"}
          >
            <SimpleGrid 
              columns={5} 
              marginBottom={"10px"}
            >
              <Text fontWeight="bold" fontSize="sm" textAlign="center">
                COLLEGE APPLIED TO
              </Text>
              <Text fontWeight="bold" fontSize="sm" textAlign="center">
                YEAR APPLIED
              </Text>
              <Text fontWeight="bold" fontSize="sm" textAlign="center">
                MAJOR
              </Text>
              <Text fontWeight="bold" fontSize="sm" textAlign="center">
                GPA
              </Text>
              <Text fontWeight="bold" fontSize="sm" textAlign="center">
                STATUS
              </Text>
            </SimpleGrid>
            <SimpleGrid columns={5}>
              <FormControl isInvalid={submitted && formData.college.trim() === ""}>
                <Flex justifyContent={"center"}>
                  <Input
                    type="text"
                    color="var(--gray-400, #A0AEC0)"
                    width="150px"
                    height="40px"
                    borderRadius={"4px"}
                    name="college"
                    placeholder="College Name"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </Flex>
                <FormErrorMessage>College is required.</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={submitted && formData.yearApplied.trim() === ""}>
                <Flex justifyContent={"center"}>
                  <Input
                    type="number"
                    color="var(--gray-400, #A0AEC0)"
                    width="150px"
                    height="40px"
                    borderRadius={"4px"}
                    name="yearApplied"
                    placeholder="Year"
                    value={formData.yearApplied}
                    onChange={handleChange}
                  />
                </Flex>
                <FormErrorMessage>Year Applied is required.</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={submitted && formData.major.trim() === ""}>
                <Flex justifyContent={"center"}>
                  <Input
                    type="text"
                    color="var(--gray-400, #A0AEC0)"
                    width="150px"
                    height="40px"
                    borderRadius={"4px"}
                    name="major"
                    placeholder="Major"
                    value={formData.major}
                    onChange={handleChange}
                  />
                </Flex>
                <FormErrorMessage>Major is required.</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={submitted && formData.gpa.trim() === ""}>
                <Flex justifyContent={"center"}>
                  <Input
                    type="number"
                    color="var(--gray-400, #A0AEC0)"
                    width="150px"
                    height="40px"
                    borderRadius={"4px"}
                    step="0.01"
                    name="gpa"
                    placeholder="GPA"
                    value={formData.gpa}
                    onChange={handleChange}
                  />
                </Flex>
                <FormErrorMessage>GPA is required.</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={submitted && formData.status.trim() === ""}>
                <Flex justifyContent={"center"}>
                  <Select
                    name="status"
                    color="var(--gray-400, #A0AEC0)"
                    width="150px"
                    height="40px"
                    borderRadius={"4px"}
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Select Status"
                  >
                    <option value="admitted">Admitted</option>
                    <option value="waitlisted">Waitlisted</option>
                    <option value="rejected">Rejected</option>
                  </Select>
                </Flex>
                <FormErrorMessage>Status is required.</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </Box>
          <FormControl
            marginTop={"15px"}
            marginBottom={"15px"}
          >
            <FormLabel 
              width={"100%"} 
              textAlign={"center"}
              fontSize={"24px"}
              fontWeight={"700"}
            >
              Additional Info
            </FormLabel>
            <Textarea
              name="additionalInfo"
              borderColor="1px solid var(--Secondary-4, #718096)" 
              rows={4}
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </FormControl>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Button 
              type={"submit"} 
              width={"110px"} 
              borderRadius={"4px"}
              backgroundColor={"black"}
              color={"white"}
              fontWeight={"400"}
              >
              <FiSend style={{ marginRight: "8px" }}/>
              Post
            </Button>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}

export default SubmitApplicationPage;
