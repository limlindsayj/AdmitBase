import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Flex, Heading, Tag, Text, HStack, Box } from '@chakra-ui/react';
import { LucideThumbsUp, MessageCircle } from 'lucide-react'; // Import icons

function ApplicationCard({ application }) {
    const [admitColor, setAdmitColor] = useState('');
    const [admitBorder, setAdmitBorder] = useState('');

    useEffect(() => {
        const fetchColorCondition = () => {  
            if (application.admit_status === "Accepted") {
                setAdmitColor('var(--green-100, #C6F6D5)');
                setAdmitBorder('var(--green-800, #22543D)')
            } else if (application.admit_status === "Waitlisted") {
                setAdmitColor('var(--orange-100, #FEEBCB)');
                setAdmitBorder('var(--orange-800, #7B341E)')
            } else {
                setAdmitColor('var(--red-100, #FED7D7)');
                setAdmitBorder('var(--red-800, #822727)');
            }
        }
    
        fetchColorCondition();
      }, []);
  return (
    <Card
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
      rounded="md"
      margin="25px"
      alignItems="center"
    >
      <CardHeader>
        <Heading size="md" mb={1}>
          {application.essay}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          {application.essay}
        </Text>
      </CardHeader>
      <CardBody width="100%" alignItems="center">
        <Flex width="100%" justifyContent="center" gap={4} alignItems="center">
          <Tag
            variant="solid"
            rounded="full"
            py={1}
            display="inline-flex"
            height="24px"
            px="8px"
            alignItems="center"
            gap="8px"
            flexShrink="0"
            borderRadius="6px"
            backgroundColor="var(--purple-100, #E9D8FD)"
            color="var(--purple-800, #44337A)"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
          >
            <strong>GPA:</strong> {application.student.gpa}
          </Tag>
          <Tag
            variant="solid"
            rounded="full"
            py={1}
            display="inline-flex"
            height="24px"
            px="8px"
            alignItems="center"
            gap="8px"
            flexShrink="0"
            borderRadius="6px"
            backgroundColor={admitColor}
            color={admitBorder}
            fontSize="14px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
          >
            {application.admit_status}
          </Tag>
          <Tag
            variant="solid"
            colorScheme="red"
            rounded="full"
            py={1}
            display="inline-flex"
            height="24px"
            px="8px"
            alignItems="center"
            gap="8px"
            flexShrink="0"
            borderRadius="6px"
            backgroundColor="var(--blue-100, #BEE3F8)"
            color="var(--blue-800, #2A4365)"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
          >
            {application.major}
          </Tag>
        </Flex>

        <HStack gap={1} alignItems="center" width="100%" justifyContent="flex-end">
          <LucideThumbsUp size={16} />
          <Text fontSize="sm">{application.likes}</Text>
        </HStack>
      </CardBody>
    </Card>
  );
}

export default ApplicationCard;