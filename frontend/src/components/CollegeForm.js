import React, { useState } from "react";

export default function CollegeForm({ onAdd }) {
  const [college, setCollege] = useState({
    name: "",
    city: "",
    type: "",
    rank: "",
  });

  const handleChange = (e) => {
    setCollege({ ...college, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(college);
    setCollege({ name: "", city: "", type: "", rank: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input name="name" placeholder="Name" value={college.name} onChange={handleChange} required />
      <input name="city" placeholder="City" value={college.city} onChange={handleChange} required />
      <input name="type" placeholder="Type" value={college.type} onChange={handleChange} required />
      <input name="rank" type="number" placeholder="Rank" value={college.rank} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}
