import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import AddDoctor from './pages/Doctors';
import DisplayDoctors from './components/ui/DisplayDoctors';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Billing from './pages/Billing';
import { Toaster } from 'sonner';
import Patients from './pages/Patients';

const App: React.FC = () => {
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/display-doctors" element={<DisplayDoctors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/display-patients" element={<Patients />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
        <Toaster richColors />
    </Router>
  );
}

export default App;

