
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import EmployeeList from "./pages/EmployeeList";
import EmployeeDetails from "./pages/EmployeeDetails";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container"> 
        {/* for routing to main page */}
         <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes> 
       </main>
    </div>
  );
}
