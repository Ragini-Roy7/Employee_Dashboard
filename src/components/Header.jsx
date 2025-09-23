import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="container header">
      <div>
        <h1>Employee Dashboard</h1>
        <div className="kicker">Manage employee data — click a card to see details.</div>
      </div>
      <nav>
        {/* linking header to home page */}
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}
