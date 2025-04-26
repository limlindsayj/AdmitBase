import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchDropdown from './features/searchDropdown.js';
import ApplicationCard from './features/applicationCard.js';

function YourComponent() {
  const [applications, setApplications] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const location = useLocation();
  const school = location.state;

  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/application/all');
        const allApps = response.data;

        setApplications(allApps);

        const majors = allApps.map(app => app.major);
        const schools = allApps.map(app => app.school);
        const options = [...new Set([...schools, ...majors])]; // Unique
        setSearchOptions(options);
      } catch (error) {
        console.error('Failed to fetch all applications:', error);
      }
    };

    fetchAllApplications();
  }, []);

  const handleSearchChange = async (filter) => {
    if (!filter || filter.trim() === "" || filter === "hello") {
      // Reset to show everything
      try {
        const response = await axios.get('http://localhost:3001/application/all');
        setApplications(response.data);
      } catch (error) {
        console.error('Failed to refetch all applications:', error);
      }
      return;
    }

    try {
      const responseMajor = await axios.get(`http://localhost:3001/application/major/${filter}`);
      const dataMajor = responseMajor.data;

      if (dataMajor.length > 0) {
        setApplications(dataMajor);
      } else {
        const responseSchool = await axios.get(`http://localhost:3001/application/school/${filter}`);
        const dataSchool = responseSchool.data[0]?.application || [];
        setApplications(dataSchool);
      }
    } catch (error) {
      console.error('Failed to fetch filtered applications:', error);
    }
  };

  return (
    <div>
      <SearchDropdown choices={searchOptions} onSearchChange={handleSearchChange} />
      {applications.length > 0 ? (
        applications.map((application, index) => (
          <ApplicationCard key={index} application={application} />
        ))
      ) : (
        <div>No applications found.</div>
      )}
    </div>
  );
}

export default YourComponent;
