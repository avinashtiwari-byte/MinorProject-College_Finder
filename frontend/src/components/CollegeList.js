import React from "react";

export default function CollegeList({ colleges }) {
  return (
    <ul>
      {colleges.map((c, i) => (
        <li key={i}>
          <strong>{c.name}</strong> — {c.city} ({c.type}) | Rank: {c.rank}
        </li>
      ))}
    </ul>
  );
}
