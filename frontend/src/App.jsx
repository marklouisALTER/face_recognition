import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { EmpData } from './pages/EmpData';
import { AddEmployee } from './pages/AddEmployee';
import { AttendanceRecord } from './pages/AttendanceRecord';
import { TestingFile } from './pages/TestingFile';
import { PageNotFound } from './pages/PageNotFound';
import { Capture } from './pages/Capture';
function App() {
  const [leftbar, setLeftbar] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage title="Face_Recognition" />}/>
        <Route path="/login" element={<Login title="Login" /> } />
        <Route path="/dashboard" element={<Dashboard title="Dashboard" leftbar={leftbar} setLeftbar={setLeftbar} /> } />
        <Route path="/tracking-record/employee-data" element={ <EmpData title={"Employee Data"} leftbar={leftbar} setLeftbar={setLeftbar}/> }/>
        <Route path="/monitoring-and-control/add-employee" element={<AddEmployee title="Add Employee" leftbar={leftbar} setLeftbar={setLeftbar}/> } />
        <Route path="/tracking-record/attendance-record" element={<AttendanceRecord title="Attendance Record" leftbar={leftbar} setLeftbar={setLeftbar} />}/>
        <Route path="/testing" element={<TestingFile /> } />
        <Route path="*" element={ <PageNotFound title="Page Not Found" /> }/>
        <Route path="/capture" element={<Capture /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
