import React from "react";

function CollegeList({ colleges }) {
  return (
    <div>
      <h2>Available Colleges</h2>
      <ul>
        {colleges.map((c, i) => (
          <li key={i}>
            {c.name} — {c.city} ({c.type}) | Rank: {c.rank}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollegeList;
