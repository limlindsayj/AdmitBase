import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Heading } from "@chakra-ui/react";
import SearchDropdown from "./features/searchDropdown.js";
import ApplicationCard from "./features/applicationCard.js";

function CollegePage() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [majors, setMajors] = useState([]);
  const [gpa, setGpa] = useState(0);
  const [schoolData, setSchoolData] = useState({});
  const location = useLocation();
  const school = location.state;

  useEffect(() => {
    const fetchApplicationsBySchool = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/application/school/${school}`
        );

        // ✅ Use correct part of the data
        const schoolApplications = response.data?.applications || [];

        const averageGpa =
          schoolApplications.reduce((sum, app) => {
            const gpa = app.student?.gpa;
            return sum + (gpa ? gpa : 0);
          }, 0) /
          (schoolApplications.filter((app) => app.student?.gpa).length || 1);

        setApplications(schoolApplications);
        setFilteredApplications(schoolApplications);

        const majorOptions = [
          ...new Set(schoolApplications.map((app) => app.major)),
        ];
        setMajors(majorOptions);
        setGpa(averageGpa.toFixed(2));

        // Fetch school metadata separately
        const schoolMetaResponse = await axios.get(
          `http://localhost:3001/school/${school}`
        );
        setSchoolData(schoolMetaResponse.data[0] || {});
      } catch (error) {
        console.error("Failed to fetch school applications:", error);
      }
    };

    fetchApplicationsBySchool();
  }, [school]);

  const handleSearchChange = (filter) => {
    if (filter === "hello" || !filter || filter.trim() === "") {
      setFilteredApplications(applications);
      return;
    }

    const filtered = applications.filter(
      (app) => (app.major ?? "").toLowerCase() === filter.toLowerCase()
    );
    setFilteredApplications(filtered);
  };

  return (
    <div>
      <SearchDropdown
        choices={majors}
        onSearchChange={handleSearchChange}
        allowResetOnBlur={true}
      />
      <Box
        maxWidth="100%"
        minHeight="1144px"
        flexShrink={0}
        borderRadius="4px"
        border="1px solid"
        borderColor="gray.600"
        backgroundColor="#FFF"
        margin="40px"
      >
        <Box width="100%" margin="30px" textAlign="center">
          <Heading>{schoolData.name || school}</Heading>
          <Heading size="md">
            Acceptance Rate: {schoolData.acceptance_rate ?? "N/A"}
          </Heading>
          <Heading size="md">City: {schoolData.city ?? "N/A"}</Heading>
          <Heading size="md">Average GPA: {gpa}</Heading>
        </Box>

        {filteredApplications.length > 0 ? (
          filteredApplications.map((application, index) => (
            <ApplicationCard key={index} application={application} />
          ))
        ) : (
          <Box textAlign="center" mt="8" fontSize="xl">
            No applications found.
          </Box>
        )}
      </Box>
    </div>
  );
}

export default CollegePage;
