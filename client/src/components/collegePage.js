import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchDropdown from "./features/searchDropdown.js" // Make sure this is the correct path and import style
import ApplicationCard from './features/applicationCard.js';


function YourComponent() {
  const [applications, setApplications] = useState([]);
  const [majors, setMajors] = useState([]);
  const [filterMajor, setFilterMajor] = useState([]);
  const location = useLocation();
  const school = location.state;

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/application/school/${school}`);
        setMajors(response.data[0].application.map((student) => student.major));
        setApplications(response.data[0].application);
        setFilterMajor(response.data[0].application);
      } catch (error) {
        console.error('Failed to fetch majors:', error);
      }
    };

    fetchMajors();
  }, []);

  const handleMajorFilter = (filter) => {
    console.log(filter.length);
    if (filter.length === 0) {
        console.log(applications);
        setFilterMajor(applications);
    } else {
        console.log("what?");
        const filtered = applications.filter((application) => application.major === filter);
        console.log(filtered)
        setFilterMajor(filtered);
    }
    
  }

  return (
    <div>
      <SearchDropdown choices={majors} onSearchChange={handleMajorFilter}/>
      {filterMajor.map((application, index) => (
        <ApplicationCard key={index} application={application}/>
      ))}
    </div>
  );
}

export default YourComponent;