import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm, onSearch]);

  return (
    <div
      className="card bg-dark border-secondary shadow-sm"
      style={{
        maxWidth: "450px",
        borderRadius: "12px",
      }}
    >
      <div className="card-body p-2">

        <div className="input-group">

          <span
            className="input-group-text bg-dark border-0 text-secondary"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>

          <input
            type="text"
            className="form-control bg-dark border-0 text-light shadow-none"
            placeholder="Search users by username or full name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

      </div>
    </div>
  );
}