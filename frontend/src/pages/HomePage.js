import React, { useEffect, useState } from "react";
import { getColleges, addCollege } from "../api/api";
import CollegeForm from "../components/CollegeForm";
import CollegeList from "../components/CollegeList";

export default function HomePage() {
  const [colleges, setColleges] = useState([]);

  const fetchColleges = async () => {
    try {
      const { data } = await getColleges();
      setColleges(data);
    } catch (err) {
      console.error("Error fetching colleges:", err);
    }
  };

  const handleAdd = async (newCollege) => {
    try {
      await addCollege(newCollege);
      fetchColleges();
    } catch (err) {
      console.error("Error adding college:", err);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>College Finder</h2>
      <CollegeForm onAdd={handleAdd} />
      <CollegeList colleges={colleges} />
    </div>
  );
}
