import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Button, Image } from '@chakra-ui/react'
import SearchDropdown from './features/searchDropdown.js';
import ApplicationCard from './features/applicationCard.js';

function CollegePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const school = location.state || '';

  const [schoolSearch, setSchoolSearch] = useState(school);
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]);      
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [majors, setMajors] = useState([]);
  const [schools, setSchools] = useState([]);
  const [gpa, setGpa] = useState(0);
  const [schoolData, setSchoolData] = useState({});
  const [majorSearch, setMajorSearch] = useState('');
  

  useEffect(() => {
    const fetchApplicationsBySchool = async () => {
      setIsLoading(true);
      try {
        const schoolToFetch = schoolSearch;
        const response = await axios.get(`http://localhost:3001/application/school/${schoolToFetch}`);
        const data1 = response.data[0]?.application || [];
        const averageGpa = data1.reduce((sum, item) => sum + item.student.gpa, 0) / data1.length;
        setGpa(averageGpa);
        setApplications(data1);       
        setFilteredApplications(data1);    
        const majorOptions = [...new Set(data1.map(app => app.major))];
        setMajors(majorOptions);
  
        const data2 = await axios.get(`http://localhost:3001/school/${schoolToFetch}`);
        setSchoolData(data2.data[0]);
      } catch (error) {
        console.error('Failed to fetch school applications:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (schoolSearch) {
      fetchApplicationsBySchool();
    }
  }, [schoolSearch]);
  

  useEffect(() => {
    axios.get('http://localhost:3001/school')
      .then((response) => {
        setSchools(response.data.map((university) => university.name));
      })
      .catch((error) => {
        console.error('API call error:', error);
      });
  }, []);

  useEffect(() => {
    const trimmed = majorSearch.trim();
  
    if (!trimmed) {
      setFilteredApplications(applications);
      return;
    }

    const filtered = applications.filter(app => 
      (app.major ?? "").toLowerCase() === majorSearch.toLowerCase()
    );
    
    setFilteredApplications(filtered);
  }, [majorSearch, applications]);

  const handleSchoolSearchChange = (newSearch) => {
    setSchoolSearch(newSearch);
    navigate('/college', { state: newSearch });
  };
  
  const handleMajorSearchChange = (newSearch) => {
    setMajorSearch(newSearch);
  };
  

  return (
    <Box
      // backgroundColor={"blue"}
      paddingLeft={"40px"}
      paddingRight={"40px"}
    >
      <Box display={"flex"} justifyContent={"space-between"} marginTop={"30px"}>
        <Box display={"flex"}>
          <SearchDropdown choices={schools} onSearchChange={handleSchoolSearchChange} allowResetOnBlur={true}/>
          <SearchDropdown choices={majors} onSearchChange={handleMajorSearchChange} allowResetOnBlur={true} />
        </Box>
        <Button 
          backgroundColor={"black"} 
          color={"white"} 
          borderRadius={"4px"}
          onClick={() => {navigate('/submit-application')}}
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
        marginTop={"30px"}
      >
        <Box 
          width="100%"
          // backgroundColor={"blue"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        > 
          <Box
            // backgroundColor={"red"}
            display={"flex"}
            alignItems={"center"}
            margin={"16px"}
          >
            <Image />
            <Heading>
              {schoolSearch}
            </Heading>
          </Box>
          <Box 
            // backgroundColor={"green"}
            display={"flex"}
            padding={"5px"}
          >
            <Heading fontSize={"24px"} color={"rgba(0, 0, 0, 0.53)"} marginLeft={"20px"} marginRight={"20px"}>
              Acceptance Rate: {schoolData.acceptance_rate}%
            </Heading>
            {/* <Heading align="center">
              {schoolData.city}
            </Heading> */}
            <Heading fontSize={"24px"} color={"rgba(0, 0, 0, 0.53)"} marginLeft={"20px"} marginRight={"20px"}>
              Avg. GPA: {gpa.toFixed(2)}
            </Heading>
          </Box>
        </Box>
        {isLoading ? (
          <div>Loading...</div>
        ) : applications.length === 0 ? (
          <Box
            margin={"30px"}
            minHeight={"300px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading
              fontWeight={"200"}
              fontSize={"20px"}
            >
              NO APPLICATIONS FOUND.
            </Heading>
          </Box>
        ) : (
          filteredApplications.map((application, index) => (
            <ApplicationCard key={index} application={application} />
          ))
        )}
      </Box>
    </Box>
  );
}

export default CollegePage;
