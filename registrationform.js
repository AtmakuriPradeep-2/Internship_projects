// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', { username, password });
    // Handle success
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
