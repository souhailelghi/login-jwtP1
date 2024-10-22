import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stepper from "../StepperForm/Stepper"; 

const StudentComponent = ({ userId, codeUIR, firstName, lastName,handleLogout }) => {
    // { token , handleLogout }
//   const [sports, setSports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [tokenError, setTokenError] = useState('');
const [student, setStudent] = useState({
  firstName: firstName || '',
  lastName: lastName || '',
  userId: userId || '',
  codeUIR: codeUIR || '',
});

const [fetchedStudent, setFetchedStudent] = useState(null);
const [error, setError] = useState('');
  const [sportId, setSportId] = useState(null);
  const [token, setToken] = useState(""); 

//   useEffect(() => {
//     if (token) {
//       validateToken();  // Automatically validate token when the component mounts
//     }
//   }, [token]);
useEffect(() => {
  const addStudent = async () => {
    try {
      const response = await axios.post('https://localhost:7125/api/Students/add', student);
      console.log('Student added successfully!', response.data);
    } catch (err) {
      console.error('Error adding student:', err);
      // setError('Failed to add student');
    }
  };

  const getStudentByUserId = async () => {
    try {
      const response = await axios.get(`https://localhost:7125/api/Students/${userId}`);
      setFetchedStudent(response.data);
    } catch (err) {
      console.error('Error fetching student:', err);
      // setError('Failed to fetch student');
    }
  };

  if (userId) {
    getStudentByUserId().then((studentExists) => {
      if (!studentExists) {
        addStudent();
      }
    });
  }
}, [userId, student]);

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
