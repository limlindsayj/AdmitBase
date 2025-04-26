import React from 'react';
import { useLocation } from 'react-router-dom';


function CollegePage() {
    const location = useLocation();
    const school = location.state;
    return (
        <div>
            {school}
        </div>
    );
}

export default CollegePage;