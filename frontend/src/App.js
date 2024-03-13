import './App.css';
import Navbar from './components/Navbar.js';
import Card from './components/Card.js';
import axios from "axios";
import { React, useEffect, useState } from "react";


function App() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);

        // console.log("Response data: ", response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    // Call the fetchTeachers function
    fetchTeachers();
  }, []);

  useEffect(() => {
    // This will log the updated state when teachers changes
    console.log("bkd: ", teachers);
  }, [teachers]); // Add teachers to the dependency array

  return (
    <div className="App">
      <Navbar />
      <div className="card-container">
        {teachers.map((teacher) => (
          <Card key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}

export default App;
