import React, { useEffect, useState } from "react";
import { getColleges, addCollege } from "../api/api";
import CollegeForm from "../components/CollegeForm";
import CollegeList from "../components/CollegeList";

function HomePage() {
  const [colleges, setColleges] = useState([]);

  const fetchColleges = async () => {
    try {
      const { data } = await getColleges();
      setColleges(data);
    } catch (err) {
      console.error("Error fetching colleges:", err);
    }
  };

  const handleAddCollege = async (newCollege) => {
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
      <CollegeForm onAdd={handleAddCollege} />
      <CollegeList colleges={colleges} />
    </div>
  );
}

export default HomePage;
