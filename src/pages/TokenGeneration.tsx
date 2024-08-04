import React, { useState } from 'react';
import axios from 'axios';

const TokenGeneration: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateToken = async () => {
    try {
      const response = await axios.post('/api/login', {
        email: 'user@example.com', 
        pass: 'password123' 
      });
      if (response.data.auth) {
        setToken(response.data.token);
      } else {
        setError('Failed to generate token');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div>
      <button onClick={handleGenerateToken}>Generate Token</button>
      {token && <p>Token: {token}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default TokenGeneration;
