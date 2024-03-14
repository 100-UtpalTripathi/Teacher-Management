import { React, createContext, useState, useContext } from "react";

const TeacherContext = createContext();

const TeacherProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);
  return (
    <TeacherContext.Provider value={[teachers, setTeachers]}>
      {children}
    </TeacherContext.Provider>
  );

};

const UseTeacherData = () => useContext(TeacherContext);
export { UseTeacherData, TeacherProvider };


