import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchDropdown from './features/searchDropdown.js';
import ApplicationCard from './features/applicationCard.js';

function CollegePage() {
  const [applications, setApplications] = useState([]);             // always full list
  const [filteredApplications, setFilteredApplications] = useState([]); // shown list
  const [majors, setMajors] = useState([]);
  const location = useLocation();
  const school = location.state;

  useEffect(() => {
    const fetchApplicationsBySchool = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/application/school/${school}`);
        const schoolData = response.data[0]?.application || [];

        setApplications(schoolData);             // full list saved
        setFilteredApplications(schoolData);     // initial view shows all
        const majorOptions = [...new Set(schoolData.map(app => app.major))];
        setMajors(majorOptions);
      } catch (error) {
        console.error('Failed to fetch school applications:', error);
      }
    };

    fetchApplicationsBySchool();
  }, [school]);

  const handleSearchChange = (filter) => {
    if (filter === "hello" || !filter || filter.trim() === "") {
      // RESET to full list saved in `applications`
      setFilteredApplications(applications);
      return;
    }

    // FILTER: By major
    const filtered = applications.filter(app => 
      (app.major ?? "").toLowerCase() === filter.toLowerCase()
    );
    setFilteredApplications(filtered);
  };

  return (
    <div>
      <SearchDropdown choices={majors} onSearchChange={handleSearchChange} allowResetOnBlur={true} />
      {filteredApplications.length > 0 ? (
        filteredApplications.map((application, index) => (
          <ApplicationCard key={index} application={application} />
        ))
      ) : (
        <div>No applications found.</div>
      )}
    </div>
  );
}

export default CollegePage;
