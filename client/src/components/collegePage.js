import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Heading, Button, Image, Input, VStack } from "@chakra-ui/react";
import axios from "axios";
import SearchDropdown from "./features/searchDropdown.js";
import ApplicationCard from "./features/applicationCard.js";

function CollegePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const school = location.state || "";

  const [schoolSearch, setSchoolSearch] = useState(school);
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [majors, setMajors] = useState([]);
  const [schools, setSchools] = useState([]);
  const [gpa, setGpa] = useState(0);
  const [schoolData, setSchoolData] = useState({});

  const [majorSearch, setMajorSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [tempGpaFilter, setTempGpaFilter] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState([]);

  const [appliedGpaFilter, setAppliedGpaFilter] = useState("");
  const [appliedStatusFilter, setAppliedStatusFilter] = useState([]);

  const popupRef = useRef(null);

  useEffect(() => {
    const fetchApplicationsBySchool = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/application/school/${school}`
        );
        const data1 = response.data?.school?.application || [];

        const averageGpa =
          data1.reduce((sum, item) => {
            const studentGpa = item.student?.gpa;
            return sum + (studentGpa ? studentGpa : 0);
          }, 0) / (data1.filter((item) => item.student?.gpa).length || 1);

        setGpa(averageGpa);
        setApplications(data1);
        setFilteredApplications(data1);

        const majorOptions = [...new Set(data1.map((app) => app.major))];
        setMajors(majorOptions);

        const schoolMeta = await axios.get(
          `http://localhost:3001/school/${school}`
        );
        setSchoolData(schoolMeta.data[0] || {});
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (school) {
      fetchApplicationsBySchool();
    }
  }, [school]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/school")
      .then((res) => {
        setSchools(res.data.map((uni) => uni.name));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (majorSearch.trim()) {
      filtered = filtered.filter(
        (app) => (app.major ?? "").toLowerCase() === majorSearch.toLowerCase()
      );
    }

    if (appliedGpaFilter) {
      filtered = filtered.filter(
        (app) =>
          app.student?.gpa && app.student.gpa >= parseFloat(appliedGpaFilter)
      );
    }

    if (appliedStatusFilter.length > 0) {
      filtered = filtered.filter((app) =>
        appliedStatusFilter.includes(app.admit_status)
      );
    }

    setFilteredApplications(filtered);
  }, [applications, majorSearch, appliedGpaFilter, appliedStatusFilter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  const handleSchoolSearchChange = (newSchool) => {
    setSchoolSearch(newSchool);
    navigate("/college", { state: newSchool });
  };

  const handleMajorSearchChange = (newMajor) => {
    setMajorSearch(newMajor);
  };

  const toggleTempStatus = (status) => {
    setTempStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApplyFilters = () => {
    setAppliedGpaFilter(tempGpaFilter);
    setAppliedStatusFilter(tempStatusFilter);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setTempGpaFilter("");
    setTempStatusFilter([]);
    setAppliedGpaFilter("");
    setAppliedStatusFilter([]);
    setMajorSearch("");
    setShowFilters(false);
  };

  return (
    <Box paddingLeft="40px" paddingRight="40px">
      <Box display="flex" justifyContent="space-between" marginTop="30px">
        <Box display="flex" alignItems="center" gap="10px">
          <SearchDropdown
            choices={schools}
            onSearchChange={handleSchoolSearchChange}
            allowResetOnBlur={true}
          />
          <SearchDropdown
            choices={majors}
            onSearchChange={handleMajorSearchChange}
            allowResetOnBlur={true}
            value={majorSearch}
          />
          <Box position="relative">
            <Button
              backgroundColor="black"
              color="white"
              borderRadius="4px"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>

            {showFilters && (
              <Box
                ref={popupRef}
                position="absolute"
                top="50px"
                right="0"
                border="1px solid #ccc"
                borderRadius="10px"
                padding="20px"
                backgroundColor="white"
                boxShadow="lg"
                width="400px"
                zIndex="10"
              >
                <VStack spacing="20px">
                  <Input
                    placeholder="Minimum GPA"
                    type="number"
                    step="0.01"
                    value={tempGpaFilter}
                    onChange={(e) => setTempGpaFilter(e.target.value)}
                  />

                  <Box display="flex" gap="10px">
                    <Button
                      flex="1"
                      variant={
                        tempStatusFilter.includes("Accepted")
                          ? "solid"
                          : "outline"
                      }
                      backgroundColor={
                        tempStatusFilter.includes("Accepted")
                          ? "var(--green-100, #C6F6D5)"
                          : "white"
                      }
                      color={
                        tempStatusFilter.includes("Accepted")
                          ? "var(--green-800, #22543D)"
                          : "green.400"
                      }
                      borderColor="green.400"
                      onClick={() => toggleTempStatus("Accepted")}
                      _hover={{ backgroundColor: "var(--green-100, #C6F6D5)" }}
                    >
                      Accepted
                    </Button>

                    <Button
                      flex="1"
                      variant={
                        tempStatusFilter.includes("Waitlisted")
                          ? "solid"
                          : "outline"
                      }
                      backgroundColor={
                        tempStatusFilter.includes("Waitlisted")
                          ? "var(--orange-100, #FEEBCB)"
                          : "white"
                      }
                      color={
                        tempStatusFilter.includes("Waitlisted")
                          ? "var(--orange-800, #7B341E)"
                          : "orange.400"
                      }
                      borderColor="orange.400"
                      onClick={() => toggleTempStatus("Waitlisted")}
                      _hover={{ backgroundColor: "var(--orange-100, #FEEBCB)" }}
                    >
                      Waitlisted
                    </Button>

                    <Button
                      flex="1"
                      variant={
                        tempStatusFilter.includes("Rejected")
                          ? "solid"
                          : "outline"
                      }
                      backgroundColor={
                        tempStatusFilter.includes("Rejected")
                          ? "var(--red-100, #FED7D7)"
                          : "white"
                      }
                      color={
                        tempStatusFilter.includes("Rejected")
                          ? "var(--red-800, #822727)"
                          : "red.400"
                      }
                      borderColor="red.400"
                      onClick={() => toggleTempStatus("Rejected")}
                      _hover={{ backgroundColor: "var(--red-100, #FED7D7)" }}
                    >
                      Rejected
                    </Button>
                  </Box>

                  <Box display="flex" gap="10px">
                    <Button
                      colorScheme="gray"
                      flex="1"
                      onClick={handleClearFilters}
                    >
                      Clear
                    </Button>
                    <Button
                      colorScheme="blue"
                      flex="1"
                      onClick={handleApplyFilters}
                    >
                      Apply
                    </Button>
                  </Box>
                </VStack>
              </Box>
            )}
          </Box>
        </Box>

        <Button
          backgroundColor="black"
          color="white"
          borderRadius="4px"
          onClick={() => navigate("/submit-application")}
        >
          + Add Stats
        </Button>
      </Box>

      <Box
        maxWidth="100%"
        height="auto"
        flexShrink={0}
        borderRadius="4px"
        border="1px solid"
        borderColor="gray.600"
        backgroundColor="#FFF"
        marginTop="30px"
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box display="flex" alignItems="center" margin="16px">
            <Image />
            <Heading>{schoolSearch}</Heading>
          </Box>
          <Box display="flex" padding="5px">
            <Heading
              fontSize="24px"
              color="rgba(0, 0, 0, 0.53)"
              marginLeft="20px"
              marginRight="20px"
            >
              Acceptance Rate:{" "}
              {schoolData.acceptance_rate
                ? (schoolData.acceptance_rate * 100).toFixed(2)
                : "N/A"}
              %
            </Heading>
            <Heading
              fontSize="24px"
              color="rgba(0, 0, 0, 0.53)"
              marginLeft="20px"
              marginRight="20px"
            >
              Avg. GPA: {gpa.toFixed(2)}
            </Heading>
          </Box>
        </Box>

        {isLoading ? (
          <div>Loading...</div>
        ) : filteredApplications.length === 0 ? (
          <Box
            margin="30px"
            minHeight="300px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontWeight="200" fontSize="20px">
              NO APPLICATIONS FOUND
            </Heading>
          </Box>
        ) : (
          filteredApplications.map((application, idx) => (
            <ApplicationCard key={idx} application={application} />
          ))
        )}
      </Box>
    </Box>
  );
}

export default CollegePage;
