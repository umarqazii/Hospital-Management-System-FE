import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
//import ForgotPassword from './pages/ForgotPassword';
import { Toaster } from 'sonner';
import PrivateRoute from './PrivateRoute';
import axios from 'axios';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (token) {
          await axios.get('http://localhost:8080/auth/protected', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } catch {
        setToken(null);
        localStorage.removeItem('token');
      }
    };

    if (token) {
      checkToken();
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster richColors />
    </Router>
  );
}

export default App;

