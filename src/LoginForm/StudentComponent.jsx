import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stepper from "../StepperForm/Stepper"; 

const StudentComponent = ({ userId, codeUIR, firstName, lastName,token,handleLogout }) => {

const [student, setStudent] = useState({
  firstName: firstName || '',
  lastName: lastName || '',
  userId: userId || '',
  codeUIR: codeUIR || '',
});

const [fetchedStudent, setFetchedStudent] = useState(null);
const [error, setError] = useState('');
  const [sportId, setSportId] = useState(null);
  // const [token, setToken] = useState(""); 


useEffect(() => {
  const addStudent = async () => {
    try {
      const response = await axios.post('https://localhost:7125/api/Students/add', student,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Student added successfully!', response.data);
    } catch (err) {
      console.error('Error adding student:', err);

    }
  };

  const getStudentByUserId = async () => {
    try {
      const response = await axios.get(`https://localhost:7125/api/Students/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFetchedStudent(response.data);
    } catch (err) {
      console.error('Error fetching student:', err);
   
    }
  };

  if (userId) {
    getStudentByUserId().then((studentExists) => {
      if (!studentExists) {
        addStudent();
      }
    });
  }
}, [userId, student, token]);

  return (
    <div>
   
  
   
       
          <Stepper sportId={sportId} token={token} />
  
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentComponent;
