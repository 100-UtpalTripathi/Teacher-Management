import './App.css';
import Navbar from './components/Navbar.js';
import Card from './components/Card.js';
import axios from "axios";
import { React, useEffect } from "react";
import { UseTeacherData } from './contexts/TeacherContext.js';




function App() {
  const [teachers, setTeachers] = UseTeacherData();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/teachers");
        setTeachers(response.data);

        console.log("Response data: ", response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    // Call the fetchTeachers function
    fetchTeachers();
  }, []);

  useEffect(() => {
    setTeachers(teachers);
  }, [teachers, setTeachers]); // Add teachers to the dependency array

  return (
    <div className="App">
      <Navbar />
      <div className="card-container">
        {teachers.length > 0 ? (teachers.map((teacher) => (
          <Card key={teacher.id} teacher={teacher} />
        ))) : (
          <div className="text-center mt-4" style={{ color: "white" }}><h4>No Teachers Found!</h4></div>
        )}
      </div>
    </div>
  );
}

export default App;
