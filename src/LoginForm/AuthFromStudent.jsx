import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './AuthFromStudent.css';
import StudentComponent from './StudentComponent'; 

const AuthFromStudent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || ''); 
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
    setEmail(''); 
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
            handleLogout={handleLogout} 
          />
        )
      )}
    </div>
  );
};

export default AuthFromStudent;
