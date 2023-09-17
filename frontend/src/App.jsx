import React, { useState } from 'react';
import { Login } from './components/pages/Login';
import { Dashboard } from './components/pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddEmployee } from './components/pages/AddEmployee';
import { EmpData } from './components/pages/EmpData';
function App() {
  const [leftbar, setLeftbar] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path="/login" 
          element={
            <Login 
              title="Login"
            />
        } />

        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              title="Dashboard"
              leftbar={leftbar}
              setLeftbar={setLeftbar}
            />
        } />
        <Route 
          path="/tracking-record/employee-data"
          element={
            <EmpData 
              title={"Employee Data"}
              leftbar={leftbar}
              setLeftbar={setLeftbar}
            />
          }/>

        <Route 
          path="/monitoring-and-control/add-employee"
          element={
            <AddEmployee 
              title="Add Employee"
              leftbar={leftbar}
              setLeftbar={setLeftbar}
            />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
