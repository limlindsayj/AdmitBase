import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Tag,
  Text,
  HStack,
  Box,
} from "@chakra-ui/react";
import { LucideThumbsUp } from "lucide-react";

function ApplicationCard({ application }) {
  const [admitColor, setAdmitColor] = useState("");
  const [admitBorder, setAdmitBorder] = useState("");

  useEffect(() => {
    if (application.admit_status === "Accepted") {
      setAdmitColor("var(--green-100, #C6F6D5)");
      setAdmitBorder("var(--green-800, #22543D)");
    } else if (application.admit_status === "Waitlisted") {
      setAdmitColor("var(--orange-100, #FEEBCB)");
      setAdmitBorder("var(--orange-800, #7B341E)");
    } else {
      setAdmitColor("var(--red-100, #FED7D7)");
      setAdmitBorder("var(--red-800, #822727)");
    }
  }, [application.admit_status]);

  return (
    <Card
      borderWidth="1px"
      rounded="md"
      margin="40px"
      ml="150px"
      mr="150px"
      alignItems="center"
      border="1.5px solid var(--Secondary-9, #F7FAFC)"
      borderColor="gray.200"
      backgroundColor="var(--Secondary-9, #F7FAFC)"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
    >
      <CardHeader textAlign="center">
        {" "}
        {/* 🎯 Center all content inside header */}
        <Heading size="md" mb={1}>
          {application.essay_name ?? "Untitled Essay"}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          {application.essay_summary ?? "No summary available."}
        </Text>
      </CardHeader>

      <CardBody width="100%" alignItems="center">
        <Flex
          width="100%"
          justifyContent="center"
          gap={4}
          alignItems="center"
          flexWrap="wrap"
        >
          <Tag
            variant="solid"
            rounded="full"
            py={1}
            display="inline-flex"
            height="24px"
            px="8px"
            alignItems="center"
            backgroundColor="var(--purple-100, #E9D8FD)"
            color="var(--purple-800, #44337A)"
            fontSize="14px"
            fontWeight="700"
          >
            <strong>GPA:</strong> {application.student?.gpa ?? "N/A"}
          </Tag>

          <Tag
            variant="solid"
            rounded="full"
            py={1}
            height="24px"
            px="8px"
            alignItems="center"
            backgroundColor={admitColor}
            color={admitBorder}
            fontSize="14px"
            fontWeight="700"
          >
            {application.admit_status ?? "Unknown Status"}
          </Tag>

          <Tag
            variant="solid"
            rounded="full"
            py={1}
            height="24px"
            px="8px"
            alignItems="center"
            backgroundColor="var(--blue-100, #BEE3F8)"
            color="var(--blue-800, #2A4365)"
            fontSize="14px"
            fontWeight="700"
          >
            {application.major ?? "No Major"}
          </Tag>
        </Flex>

        <HStack
          gap={1}
          alignItems="center"
          width="100%"
          justifyContent="flex-end"
          mt={4}
        >
          <LucideThumbsUp size={16} />
          <Text fontSize="sm">{application.likes ?? 0}</Text>
        </HStack>
      </CardBody>
    </Card>
  );
}

export default ApplicationCard;
