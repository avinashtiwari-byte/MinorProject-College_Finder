import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [colleges, setColleges] = useState([]);
  const [newCollege, setNewCollege] = useState({
    name: "",
    city: "",
    type: "",
    rank: ""
  });

  // Fetch all colleges when app loads
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/colleges`)
      .then(res => setColleges(res.data))
      .catch(err => console.error("Error fetching colleges:", err));
  }, []);

  // Add a new college
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/colleges`, newCollege);
      alert("✅ College added!");
      setNewCollege({ name: "", city: "", type: "", rank: "" });
      // Refresh list
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/colleges`);
      setColleges(res.data);
    } catch (err) {
      console.error("Error adding college:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎓 College Finder</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newCollege.name}
          onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={newCollege.city}
          onChange={(e) => setNewCollege({ ...newCollege, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Type (Govt/Private)"
          value={newCollege.type}
          onChange={(e) => setNewCollege({ ...newCollege, type: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Rank"
          value={newCollege.rank}
          onChange={(e) => setNewCollege({ ...newCollege, rank: e.target.value })}
          required
        />
        <button type="submit">Add College</button>
      </form>

      <h2>Available Colleges:</h2>
      <ul>
        {colleges.map((c, i) => (
          <li key={i}>{c.name} — {c.city} ({c.type})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
