// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Stepper from "../StepperForm/Stepper"; 

// const StudentComponent = ({ userId, codeUIR, firstName, lastName,token,handleLogout }) => {

// const [student, setStudent] = useState({
//   firstName: firstName || '',
//   lastName: lastName || '',
//   userId: userId || '',
//   codeUIR: '',
// });

// const [fetchedStudent, setFetchedStudent] = useState(null);
// const [error, setError] = useState('');
//   const [sportId, setSportId] = useState(null);
//   const [codeUIR, setCodeUIR] = useState('');
// useEffect(() => {
//   const addStudent = async () => {
//     try {
//       const response = await axios.post('https://localhost:7125/api/Students/add', student,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log('Student added successfully!', response.data);

//     } catch (err) {
//       console.error('Error adding student:', err);

//     }
//   };

//   const getStudentByUserId = async () => {
 
//     try {
//       const response = await axios.get(`https://localhost:7125/api/Students/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("getStudentByUserId : " , response.data);
//       console.log("- code uir  " , response.data.codeUIR);
      
//       setFetchedStudent(response.data);
//       setCodeUIR(response.data.codeUIR);
//     } catch (err) {
//       console.error('Error fetching student:', err);
   
//     }
//   };

//   if (userId) {
//     getStudentByUserId().then((studentExists) => {
//       if (!studentExists) {
//         addStudent();
//       }
//     });
//   }
// }, [userId, student, token ]);
// console.log(' from studentComponent Code UIR is:', codeUIR || 'No code UIR found');

//   return (
//     <div>
   
  
   
       
//           <Stepper sportId={sportId} token={token} codeUIR={codeUIR}/>
  
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default StudentComponent;


//todo : ------------------------------
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stepper from "../StepperForm/Stepper"; 

const StudentComponent = ({ userId, firstName, lastName, token, handleLogout }) => {

  const [student, setStudent] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    userId: userId || '',
    codeUIR: '', // Initially empty, to be filled from API
  });

  const [fetchedStudent, setFetchedStudent] = useState(null);
  const [error, setError] = useState('');
  const [sportId, setSportId] = useState(null);
  const [codeUIR, setCodeUIR] = useState(''); // State to store fetched codeUIR

  useEffect(() => {
    const addStudent = async () => {
      try {
        const response = await axios.post('https://localhost:7125/api/Students/add', student, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Student added successfully!', response.data);
      } catch (err) {
        console.error('Error adding student:', err);
      }
    };

    const getStudentByUserId = async () => {
      try {
        const response = await axios.get(`https://localhost:7125/api/Students/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("getStudentByUserId:", response.data);
        console.log("- code UIR:", response.data.codeUIR);

        setFetchedStudent(response.data);
        setCodeUIR(response.data.codeUIR); // Update the codeUIR state when fetched
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

  console.log('Code UIR in StudentComponent:', codeUIR || 'No code UIR found');

  return (
    <div>
      <Stepper
        sportId={sportId}
        token={token}
        codeUIR={codeUIR} // Pass the dynamically fetched codeUIR to Stepper
      />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentComponent;
