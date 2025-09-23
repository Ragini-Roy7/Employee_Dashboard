import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import EmployeeCard from "../components/EmployeeCard";
import { useNavigate } from "react-router-dom";


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]); // main list 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [selected, setSelected] = useState(new Set()); 
  const [editingEmployee, setEditingEmployee] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setEmployees(json);
      } catch (err) {
        setError("Could not load employees. " + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  //  Handlers
  function handleDelete(id) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
  }

  function handleEdit(updated) {
    setEmployees((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setEditingEmployee(null);
  }

  function toggleSelect(id, checked) {
    setSelected((prev) => {
      const copy = new Set(prev);
      if (checked) copy.add(id);
      else copy.delete(id);
      return copy;
    });
  }

  function deleteSelected() {
    if (selected.size === 0) return;
    setEmployees((prev) => prev.filter((e) => !selected.has(e.id)));
    setSelected(new Set());
  }

  function handleSearch(value) {
    setSearchId(value);
  }
  const displayed = searchId
    ? employees.filter((e) => String(e.id) === String(searchId))
    : employees;

  return (
  <>
    <div className="container">
      <div className="instructions">
        Tip: use the search field to filter employees by <strong>id</strong>. 
        Click a card to open details.
      </div>

      <SearchBar
        value={searchId}
        onChange={(v) => setSearchId(v)}
        onSearch={(v) => handleSearch(v)}
        onClear={() => setSearchId("")}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="kicker">Showing {displayed.length} employee(s)</div>
        <div>
          <button 
            className="btn" 
            onClick={() => setSelected(new Set(employees.map(e => e.id)))}
          >
            Select All
          </button>
          <button 
            className="btn btn-danger" 
            onClick={deleteSelected} 
            style={{ marginLeft: 8 }}
          >
            Delete Selected ({selected.size})
          </button>
        </div>
      </div>

     {loading && <div className="spinner"></div>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="grid" style={{ marginTop: 12 }}>
        {displayed.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            selected={selected.has(emp.id)}
            onDelete={handleDelete}
            onEdit={(employee) => setEditingEmployee(employee)}
            onToggleSelect={toggleSelect}
            onClickCard={(id) => navigate(`/employee/${id}`)}
          />
        ))}
      </div>
    </div>

   {editingEmployee && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Edit Employee</h3>
      <div style={{ marginBottom: 10 }}>
        <label>Name</label>
        <input defaultValue={editingEmployee.name} id="edit-name" />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Email</label>
        <input defaultValue={editingEmployee.email} id="edit-email" />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Phone</label>
        <input defaultValue={editingEmployee.phone} id="edit-phone" />
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button className="btn" onClick={() => setEditingEmployee(null)}>Cancel</button>
        <button className="btn" onClick={() => {
          const updated = {
            ...editingEmployee,
            name: document.getElementById("edit-name").value,
            email: document.getElementById("edit-email").value,
            phone: document.getElementById("edit-phone").value
          };
          handleEdit(updated);
        }}>Save</button>
      </div>
    </div>
  </div>
)}
  </>
);
}
