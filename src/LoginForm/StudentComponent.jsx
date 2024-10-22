import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stepper from "../StepperForm/Stepper"; 

const StudentComponent = ({ handleLogout }) => {
    // { token , handleLogout }
//   const [sports, setSports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [tokenError, setTokenError] = useState('');
  const [sportId, setSportId] = useState(null);
  const [token, setToken] = useState(""); 

//   useEffect(() => {
//     if (token) {
//       validateToken();  // Automatically validate token when the component mounts
//     }
//   }, [token]);


  return (
    <div>
   
      {/* Add other content related to student */}
      
      {/* Sports section */}
   
       
          <Stepper sportId={sportId} token={token} />
        

   

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentComponent;
