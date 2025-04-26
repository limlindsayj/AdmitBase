import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading } from '@chakra-ui/react'
import SearchDropdown from './features/searchDropdown.js';
import ApplicationCard from './features/applicationCard.js';

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
        const response = await axios.get(`http://localhost:3001/application/school/${school}`);
        const data1 = response.data[0]?.application || [];
        const averageGpa = data1.reduce((sum, item) => sum + item.student.gpa, 0) / data1.length;
        setGpa(averageGpa);
        setApplications(data1);       
        setFilteredApplications(data1);    
        const majorOptions = [...new Set(data1.map(app => app.major))];
        setMajors(majorOptions);
        const data2 = await axios.get(`http://localhost:3001/school/${school}`);
        setSchoolData(data2.data[0]);
        console.log(data2.data[0]);
      } catch (error) {
        console.error('Failed to fetch school applications:', error);
      }
    };

    fetchApplicationsBySchool();
  }, [school]);

  const handleSearchChange = (filter) => {
    if (filter === "hello" || !filter || filter.trim() === "") {
      setFilteredApplications(applications);
      return;
    }

    const filtered = applications.filter(app => 
      (app.major ?? "").toLowerCase() === filter.toLowerCase()
    );
    setFilteredApplications(filtered);
  };

  return (
    <div>
      <SearchDropdown choices={majors} onSearchChange={handleSearchChange} allowResetOnBlur={true} />
      <Box
      maxWidth="100%"
      height="1144px"
      flexShrink={0}
      borderRadius="4px"
      border="1px solid"
      borderColor="gray.600" // You can map your var(--Secondary-4) to a color in Chakra's theme, here using gray.600
      backgroundColor="#FFF"
      margin="40px"
      >
        <Box width="100%" flexShrink={0} margin="30px" flexDirection="vertical"> 
          <Heading align="center">
            {school}
          </Heading>
          <Heading align="center">
            {schoolData.acceptance_rate}
          </Heading>
          <Heading align="center">
            {schoolData.city}
          </Heading>
          <Heading align="center">
            {gpa}
          </Heading>
        </Box>
        
{filteredApplications.length > 0 ? (
        filteredApplications.map((application, index) => (
          <ApplicationCard key={index} application={application} />
        ))
      ) : (
        <div>No applications found.</div>
      )}
      </Box>
      
      
      
    </div>
  );
}

export default CollegePage;
