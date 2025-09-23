import React from "react";

export default function SearchBar({ value, onChange, onSearch, onClear }) {
  return (
    <div className="search-row">
      <input
        type="number"
        placeholder="Search by ID (e.g. 1)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="controls">
        <button className="btn" onClick={() => onSearch(value)}>Search</button>
        <button className="btn" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}
