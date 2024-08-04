import React, { useState } from 'react';
import { FaBell, FaSearch, FaHome, FaCalendarCheck, FaUser, FaUserMd, FaPills, FaFileInvoiceDollar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { TooltipItem } from 'chart.js';
import Patients from './Patients';
import Doctors from './Doctors';
import Billing from './Billing';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const adminPImg = require('./admin-p.png'); 

const logout = () => {
    // Add your logout logic here
    window.location.href = '/'; // Redirect to login page
}

const Dashboard: React.FC = () => {
    const [selectedAppointment, setSelectedAppointment] = useState<'all' | 'new' | 'old'>('all');
    const [activePage, setActivePage] = useState<string>('overview');
    // Sample data for the table
    const appointmentData = {
        all: [
            { slNo: 1, name: 'John Doe', gender: 'Male', phone: '123-456-7890', date: '2024-07-01', time: '10:00 AM', status: 'Active' },
            { slNo: 2, name: 'Jane Smith', gender: 'Female', phone: '234-567-8901', date: '2024-07-01', time: '11:00 AM', status: 'Inactive' },
            // Add more data as needed
        ],
        new: [
            { slNo: 1, name: 'Alice Walker', gender: 'Female', phone: '111-222-3333', date: '2024-07-01', time: '08:00 AM', status: 'Active' },
            { slNo: 2, name: 'Charlie Harris', gender: 'Male', phone: '222-333-4444', date: '2024-07-01', time: '09:30 AM', status: 'Active' },
            // Add more data as needed
        ],
        old: [
            { slNo: 1, name: 'William Scott', gender: 'Male', phone: '666-777-8888', date: '2024-07-01', time: '08:30 AM', status: 'Active' },
            { slNo: 2, name: 'Isabella Allen', gender: 'Female', phone: '777-888-9999', date: '2024-07-01', time: '09:30 AM', status: 'Inactive' },
            // Add more data as needed
        ],
    };

    // Sample data for charts
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Patient Visits',
            data: [50, 70, 60, 90, 80, 100, 95],
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
        }],
    };

    const barChartData = {
        labels: ['Success A', 'Success B', 'Success C'],
        datasets: [{
            label: 'Success Rate',
            data: [75, 85, 90],
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
        }],
    };

    const percentageData = {
        labels: ['Doctors', 'Patients', 'Pharmacists'],
        datasets: [{
            data: [45, 50, 5],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
        }],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<'line' | 'bar' | 'pie'>) => `Value: ${tooltipItem.raw}`,
                },
            },
        },
    };

    return (
        <div style={{ display: 'flex', fontFamily: "'Poppins', sans-serif" }}>
            {/* Left Panel */}
            <div style={{
    width: '250px',
    backgroundColor: '#005D90',
    color: '#ecf0f1',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '1rem',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,  // Ensure the sticky positioning starts from the top
    left: 0,
}}>
    <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* Search Bar */}
        <div style={{
            position: 'relative',
            marginBottom: '1rem'
        }}>
            <input
                type="text"
                placeholder="Search..."
                style={{
                    padding: '0.5rem 2rem',
                    borderRadius: '20px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    width: '200px',
                    outline: 'none'
                }}
            />
            <div style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)'
            }}>
                <FaSearch size={16} color="#aaa" />
            </div>
                                </div>
                    <li style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', cursor: 'pointer' }} onClick={() => setActivePage('overview')}>
                    <span style={{ marginRight: '1rem' }}><FaHome /></span>
                    Overview
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', cursor: 'pointer' }}onClick={() => setActivePage('appointments')}>
                        <span style={{ marginRight: '1rem' }}><FaCalendarCheck /></span> Appointments
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', cursor: 'pointer' }} onClick={() => setActivePage('patients')}>
                        <span style={{ marginRight: '1rem' }}><FaUser /></span> Patients
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', cursor: 'pointer' }} onClick={() => setActivePage('doctors')}>
                        <span style={{ marginRight: '1rem' }}><FaUserMd /></span> Doctors
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', cursor: 'pointer' }} onClick={() => setActivePage('pharmacy')}>
                        <span style={{ marginRight: '1rem' }}><FaPills /></span> Pharmacy
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', cursor: 'pointer' }} onClick={() => setActivePage('billing')}>
                        <span style={{ marginRight: '1rem' }}><FaFileInvoiceDollar /></span> Billing
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', cursor: 'pointer' }} onClick={() => setActivePage('settings')}>
                        <span style={{ marginRight: '1rem' }}><FaCog /></span> Settings
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', cursor: 'pointer' }} onClick={() => setActivePage('logout')}>
                        <span style={{ marginRight: '1rem' }}><FaSignOutAlt /></span> Logout
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={{
                padding: '2rem',
                width: '100%',
                background: 'white'
            }}>
                {activePage === 'overview' && (
                    <div>
                        {/* Top Navbar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            backgroundColor: '#ffffff', // Navbar background color
                            color: '#2c3e50',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            marginBottom: '1rem'
                        }}>
                            <h1 style={{ margin: 0 }}>Dashboard</h1>
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                {/* Profile Picture */}
                                <img
                                    src={adminPImg}
                                    alt="Profile"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: '2px solid #2c3e50',
                                        marginRight: '1rem'
                                    }}
                                />                                
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <FaBell size={20} color="#fff" />
                                </button>
                            </div>
                        </div>

                        {/* Dashboard Cards */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            <Card title="Overall Visitors" emoji="👥" count="1,234" />
                            <Card title="Total Doctors" emoji="👨‍⚕️" count="456" />
                            <Card title="Total Patients" emoji="🧑‍⚕️" count="789" />
                            <Card title="Total Pharmacists" emoji="💊" count="123" />
                        </div>

                        {/* Big Cards */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            <BigCard title="Patient Statistics" chart={<Line data={lineChartData} options={chartOptions} />} />
                            <BigCard title="Hospital Report" chart={<Pie data={percentageData} />} />
                            <BigCard title="Success Statistics" chart={<Bar data={barChartData} options={chartOptions} />} />
                        </div>

                        {/* Appointments Section */}
                        <div style={{ marginTop: '2rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <h2 style={{ marginTop: 0, color: '#333' }}>Appointments</h2>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ marginRight: '1rem' }}>
                                    <input
                                        type="radio"
                                        value="all"
                                        checked={selectedAppointment === 'all'}
                                        onChange={(e) => setSelectedAppointment(e.target.value as 'all' | 'new' | 'old')}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    All Patients
                                </label>
                                <label style={{ marginRight: '1rem' }}>
                                    <input
                                        type="radio"
                                        value="new"
                                        checked={selectedAppointment === 'new'}
                                        onChange={(e) => setSelectedAppointment(e.target.value as 'all' | 'new' | 'old')}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    New Patients
                                </label>
                                <label style={{ marginLeft: '1rem' }}>
                                    <input
                                        type="radio"
                                        value="old"
                                        checked={selectedAppointment === 'old'}
                                        onChange={(e) => setSelectedAppointment(e.target.value as 'all' | 'new' | 'old')}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    Old Patients
                                </label>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    overflow: 'hidden'
                                }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f1f1f1', color: '#333', textAlign: 'left' }}>
                                            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Serial Number</th>
                                            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Patient Name</th>
                                            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Gender</th>
                                            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Phone Number</th>
                                            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Date</th>
                                            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>Time</th>
                                            <th style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>User Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(appointmentData[selectedAppointment] || []).map(appointment => (
                                            <tr key={appointment.slNo} style={{ borderBottom: '1px solid #ddd', transition: 'background-color 0.3s' }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                                                <td style={{ padding: '1rem' }}>{appointment.slNo}</td>
                                                <td style={{ padding: '1rem' }}>{appointment.name}</td>
                                                <td style={{ padding: '1rem' }}>{appointment.gender}</td>
                                                <td style={{ padding: '1rem' }}>{appointment.phone}</td>
                                                <td style={{ padding: '1rem' }}>{appointment.date}</td>
                                                <td style={{ padding: '1rem' }}>{appointment.time}</td>
                                                <td style={{ padding: '1rem' }}>{appointment.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {/* Add more pages for 'appointments', 'patients', 'doctors', 'pharmacy', 'billing', 'settings', 'logout' as needed */}
                {activePage === 'appointments' && (
                    <div>
                        {/* Add your appointments page content here */}
                        <h1>Appointments Page</h1>
                        
                    </div>
                )}
                {activePage === 'patients' && (
                    <div style={{
                        padding: 'rem', // Reduce padding here
                        width: '100%',
                        background: 'white'
                    }}>
                        {/* Add your doctors page content here */}
                        {/* <h1>Doctors Page</h1> */}
                        <Patients />
                    </div>
                )}
                {activePage === 'doctors' && (
                    <div style={{
                        padding: 'rem', // Reduce padding here
                        width: '100%',
                        background: 'white'
                    }}>
                        {/* Add your doctors page content here */}
                        {/* <h1>Doctors Page</h1> */}
                        <Doctors />
                    </div>
                )}
                {activePage === 'pharmacy' && (
                    <div>
                        {/* Add your pharmacy page content here */}
                        <h1>Pharmacy Page</h1>
                    </div>
                )}
                {activePage === 'billing' && (
                    <div>
                        {/* Add your billing page content here */}
                        <Billing />
                    </div>
                )}
                {activePage === 'settings' && (
                    <div>
                        {/* Add your settings page content here */}
                        <h1>Settings Page</h1>
                    </div>
                )}
                {activePage === 'logout' && (
                    <div>
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

interface CardProps {
    title: string;
    emoji: string;
    count: string;
}


const Card: React.FC<CardProps> = ({ title, emoji, count }) => (
    <div style={{
        flex: '1 1 200px',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, background-color 0.3s',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#333',
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.backgroundColor = '#2c3e50'; // Deep blue color on hover
        e.currentTarget.style.color = '#fff'; // White text color on hover
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.backgroundColor = '#fff'; // Reset background color
        e.currentTarget.style.color = '#333'; // Reset text color
    }}
    >
        <div style={{ fontSize: '2rem' }}>{emoji}</div>
        <h3 style={{ margin: '0.5rem 0' }}>{title}</h3>
        <p style={{ fontSize: '1.5rem', margin: 0 }}>{count}</p>
    </div>
);



interface BigCardProps {
    title: string;
    chart: React.ReactElement;
}

const BigCard: React.FC<BigCardProps> = ({ title, chart }) => (
    <div style={{
        flex: '1 1 300px',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
        cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>{title}</h3>
        <div>{chart}</div>
    </div>
);

export default Dashboard;
