import fs from "fs";
import uniqid from "uniqid";

const dataFilePath = "./teachers.json";

// Function to read data from the file asynchronously
const readDataFromFile = async () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return await JSON.parse(data);
  } catch (error) {
    console.error("Error reading data from file:", error);
    return [];
  }
};

// Function to write data to the file asynchronously
const writeDataToFile = async (data) => {
  try {
    const JsonObject =JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath,JsonObject );
  } catch (error) {
    console.error("Error writing data to file:", error);
  }
};

//function to find the index of a teacher by ID
const findTeacherIndexById = (teachers, teacherId) => {
  return teachers.findIndex((teacher) => teacher.id === teacherId);
};

// Controller for getting all teachers
export const getAllTeachersController = async (req, res) => {
  const teachers = await readDataFromFile();
  res.json(teachers);
};

// Controller for adding a new teacher
export const addTeacherController = async (req, res) => {
  let teachers = await readDataFromFile();

  const newTeacher = req.body; // Assuming the teacher data is sent in the request body
  let uid = uniqid();
  newTeacher["id"] = uid;

  console.log(newTeacher);
  teachers.push(newTeacher);
  writeDataToFile(teachers);
  res.json({ message: "Teacher added successfully", teacher: newTeacher });
};

// Controller for filtering teachers
export const filterTeacherController = async (req, res) => {
  const teachers = await readDataFromFile();

  // Get filtering parameters from the query
  const { minAge, maxAge, classes } = req.query;
  console.log(req.query);

  // Convert age and classes to integers
  const minAgeFilter = parseInt(minAge);
  const maxAgeFilter = parseInt(maxAge);
  const classesFilter = parseInt(classes);

  // Filtering logic based on age range and classes
  console.log(teachers);
  const filteredTeachers = teachers.filter((teacher) => {
    const isAgeInRange =
      (!minAgeFilter || teacher.age >= minAgeFilter) &&
      (!maxAgeFilter || teacher.age <= maxAgeFilter);

    return isAgeInRange && (!classesFilter || teacher.classes === classesFilter);
  });
  //console.log(filteredTeachers);
  res.json(filteredTeachers);
};

// Controller for searching teachers based on name
export const searchTeacherController = async (req, res) => {
  const teachers = await readDataFromFile();

  // Get the name parameter from the query
  const { name } = req.query;
  //console.log(name);

  // Searching logic based on name
  const searchResults = teachers.filter((teacher) => {
    // Case-insensitive search by converting both the name and the search query to lowercase
    const lowercaseName = teacher.name.toLowerCase();
    //console.log(lowercaseName);
    const lowercaseQuery = name.toString().toLowerCase();
    //console.log(lowercaseQuery);
    return lowercaseName.includes(lowercaseQuery);
  });
  console.log(searchResults);
  res.json(searchResults);
};

// Controller for updating an teacher record
export const updateTeacherController = async (req, res) => {
  let teachers = await readDataFromFile();
  const teacherId = req.params.id;

  // Find the index of the teacher with the given ID
  const teacherIndex = findTeacherIndexById(teachers, teacherId);

  if (teacherIndex !== -1) {
    // Update the teacher's profile based on the request body
    const updatedTeacher = { ...teachers[teacherIndex], ...req.body };
    teachers[teacherIndex] = updatedTeacher;
    writeDataToFile(teachers);
    res.json({ message: "Teacher updated successfully", updatedTeacher });
  } else {
    // If the teacher with the given ID is not found, respond with a 404 status and an error message
    res.status(404).json({ message: "Teacher not found" });
  }
};

// Controller for deleting an teacher
export const deleteTeacherController = async (req, res) => {
  let teachers = await readDataFromFile();
  const teacherId = req.params.id;

  // Find the index of the teacher with the given ID
  const teacherIndex = findTeacherIndexById(teachers, teacherId);

  if (teacherIndex !== -1) {
    // Remove the teacher from the array
    const deletedTeacher = teachers.splice(teacherIndex, 1)[0];
    writeDataToFile(teachers);
    res.json({ message: "Teacher deleted successfully", deletedTeacher });
  } else {
    res.status(404).json({ message: "Teacher not found" });
  }
};