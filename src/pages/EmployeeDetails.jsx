import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOne() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setEmployee(json);
      } catch (err) {
        setError("Could not load employee. " + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOne();
  }, [id]);

  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)}>← Back</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {employee && (
        <div className="detail" style={{ marginTop: 12 }}>
          <h2>{employee.name}</h2>
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Website:</strong> {employee.website}</p>
        </div>
      )}
    </div>
  );
}

