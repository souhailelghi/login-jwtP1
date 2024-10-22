import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentComponent.css';

const StudentComponent = ({ token, userId, codeUIR, firstName, lastName, handleLogout }) => {
  const [student, setStudent] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    userId: userId || '',
    codeUIR: codeUIR || '',
  });

  const [fetchedStudent, setFetchedStudent] = useState(null);
  const [error, setError] = useState('');

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
      <h2>Student Profile</h2>
      {fetchedStudent ? (
        <div>
          <h3>Student Details</h3>
          <p>First Name: {fetchedStudent.firstName}</p>
          <p>Last Name: {fetchedStudent.lastName}</p>
          <p>User ID: {fetchedStudent.userId}</p>
          <p>Code UIR: {fetchedStudent.codeUIR}</p>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const AuthFromStudent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Retrieve token from localStorage
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (token) {
      const { userId, codeUIR, firstName, lastName } = JSON.parse(localStorage.getItem('studentData')) || {};
      setStudentData({ userId, codeUIR, firstName, lastName });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7253/api/Account/registerAutomaticallyAndLoginAutomatically', {
        email,
        password,
      });

      const { token, userId, codeUIR, firstName, lastName } = response.data;
      setToken(token);
      localStorage.setItem('token', token); // Store token in localStorage
      localStorage.setItem('studentData', JSON.stringify({ userId, codeUIR, firstName, lastName })); // Store student data

      // Set student data for further processing
      setStudentData({
        userId,
        codeUIR,
        firstName,
        lastName,
      });

      console.log('Login successful, student data:', { userId, codeUIR, firstName, lastName });
    } catch (error) {
      setErrorMessage(error.response?.data?.Message || 'Registration/Login failed');
    }
  };

  const handleLogout = () => {
    setToken(''); // Clear the token to log the user out
    setStudentData(null); // Clear student data
    setEmail(''); // Optionally, clear email and password fields
    setPassword('');
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('studentData'); // Remove student data from localStorage
    console.log('User logged out');
  };

  return (
    <div>
      {!token ? (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      ) : (
        studentData && (
          <StudentComponent
            token={token}
            userId={studentData.userId}
            codeUIR={studentData.codeUIR}
            firstName={studentData.firstName}
            lastName={studentData.lastName}
            handleLogout={handleLogout} // Pass logout handler to StudentComponent
          />
        )
      )}
    </div>
  );
};

export default AuthFromStudent;

