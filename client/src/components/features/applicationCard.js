import React from 'react';
import { Card, CardHeader, CardBody, Flex, Heading, Badge, Text, HStack, Spacer } from '@chakra-ui/react';
import { LucideThumbsUp, MessageCircle } from 'lucide-react'; // Import icons

function ApplicationCard({application}) {
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
      <CardBody alignItems="center">
        <Flex alignItems="center" gap={4}>
          <Text>
            <strong>GPA:</strong> {application.student.gpa}
          </Text>
          <Badge
            variant="solid"
            colorScheme={application.admit_status ? "green" : "red"}
            rounded="full"
            px={2}
            py={1}
          >
            Rejected
          </Badge>
          <HStack gap={1} alignItems="center">
            <LucideThumbsUp size={16} />
            <Text fontSize="sm">1.5k</Text>
          </HStack>
          <HStack gap={1} alignItems="center">
            <MessageCircle size={16} />
            <Text fontSize="sm">2</Text>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ApplicationCard;
