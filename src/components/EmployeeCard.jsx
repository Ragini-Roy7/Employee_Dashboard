import React from "react";

export default function EmployeeCard({
  employee,
  onDelete,
  onEdit,
  onToggleSelect,
  selected,
  onClickCard
}) {
  const { id, name, email, phone } = employee;

  return (
    <div className="card" onClick={() => onClickCard(id)}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelect(id, e.target.checked);
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <div style={{ flex: 1 }}>
          <h3>{name}</h3>
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </div>
      </div>

      <div className="actions">
        <button
          className="btn btn-edit btn-small"
          onClick={(e) => { e.stopPropagation(); onEdit(employee); }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-small"
          onClick={(e) => { e.stopPropagation(); onDelete(id); }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
