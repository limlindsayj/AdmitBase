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
  Heading,
  Text,
} from "@chakra-ui/react";

function SubmitProfilePage() {
  const [formData, setFormData] = useState({
    college: "",
    essay: "",
    major: "",
    gpa: "",
    status: "",
    admissionYear: "",
    classes: "",
    additionalInfo: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [resultColor, setResultColor] = useState("green");

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
      formData.admissionYear.trim() !== "" &&
      formData.classes.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateFields()) {
      setResultColor("red");
      setResultMessage("Please fill out all required fields correctly.");
      return;
    }

    const payload = {
      ...formData,
      gpa: parseFloat(formData.gpa),
      admissionYear: parseInt(formData.admissionYear),
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
        setResultColor("green");
        setResultMessage("Submission successful!");
        console.log("Submitted data:", data);
      } else {
        setResultColor("red");
        setResultMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResultColor("red");
      setResultMessage("Server error. Try again later.");
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={6}>
      <Heading mb={6}>Submit College Application Info</Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {resultMessage && (
            <Text color={resultColor} fontWeight="bold">
              {resultMessage}
            </Text>
          )}

          <FormControl isInvalid={submitted && formData.college.trim() === ""}>
            <FormLabel>College</FormLabel>
            <Input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
            />
            <FormErrorMessage>College is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={submitted && formData.essay.trim() === ""}>
            <FormLabel>Essay</FormLabel>
            <Textarea
              name="essay"
              rows={6}
              value={formData.essay}
              onChange={handleChange}
            />
            <FormErrorMessage>Essay is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={submitted && formData.major.trim() === ""}>
            <FormLabel>Major</FormLabel>
            <Input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
            />
            <FormErrorMessage>Major is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={submitted && formData.gpa.trim() === ""}>
            <FormLabel>GPA</FormLabel>
            <Input
              type="number"
              step="0.01"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
            />
            <FormErrorMessage>GPA is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={submitted && formData.status.trim() === ""}>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Select status"
            >
              <option value="admitted">Admitted</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="rejected">Rejected</option>
            </Select>
            <FormErrorMessage>Status is required.</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={submitted && formData.admissionYear.trim() === ""}
          >
            <FormLabel>Admission Year</FormLabel>
            <Input
              type="number"
              name="admissionYear"
              value={formData.admissionYear}
              onChange={handleChange}
            />
            <FormErrorMessage>Admission year is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={submitted && formData.classes.trim() === ""}>
            <FormLabel>Classes (separate with commas)</FormLabel>
            <Textarea
              name="classes"
              rows={4}
              value={formData.classes}
              onChange={handleChange}
            />
            <FormErrorMessage>Classes are required.</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Additional Info</FormLabel>
            <Textarea
              name="additionalInfo"
              rows={4}
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" width="full" mt={4}>
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default SubmitProfilePage;
