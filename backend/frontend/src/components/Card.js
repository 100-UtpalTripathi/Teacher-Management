import React, { useState } from 'react';
import axios from 'axios';

import { UseTeacherData } from '../contexts/TeacherContext';

const Card = (props) => {

  const [teachers, setTeachers] = UseTeacherData();
  //console.log("In Card.js : ", teachers);

  const [updateFormData, setUpdateFormData] = useState({
    name: props.teacher.name,
    age: props.teacher.age,
    dob: props.teacher.dob,
    classes: props.teacher.classes,
  });

  const handleUpdateClick = () => {
    setUpdateFormData({
      name: props.teacher.name,
      age: props.teacher.age,
      dob: props.teacher.dob,
      classes: props.teacher.classes,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/teachers/update/${props.teacher.id}`, updateFormData);
      console.log(response.data); // Assuming the server responds with some data
      // onUpdate(); // Trigger a callback to refresh the teacher data

      const updatedTeachers = teachers.map((teacher) => {
        if (teacher.id === props.teacher.id) {
          return { ...teacher, ...updateFormData };
        }
        return teacher;
      });
      setTeachers(updatedTeachers);

    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/teachers/delete/${props.teacher.id}`);
      //console.log(response.data); // Assuming the server responds with some data
      // onUpdate(); // Trigger a callback to refresh the teacher data

      const updatedTeachers = teachers.filter((teacher) => teacher.id !== props.teacher.id);
      setTeachers(updatedTeachers);

    } catch (error) {
      console.error('Error Deleting teacher:', error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem", margin: "15px 8px" }}>
        {/* <img src={teacher.image} className="card-img-top" alt="..." /> */}
        <div className="card-body">

          <h5 className="card-title">{props.teacher.name}</h5>
          <p className="card-text">Age: {props.teacher.age}</p>
          <p className="card-text">DOB: {props.teacher.dob}</p>
          <p className="card-text">No. of Classes: {props.teacher.classes}</p>

          <div className="d-flex justify-content-around">
            <a
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target={`#updateteacher-${props.teacher.id}`}
              onClick={handleUpdateClick}
            >
              Update
            </a>
            <a onClick={handleDelete}
              data-bs-target={`#updateteacher-${props.teacher.id}`}
              className="btn btn-danger">
              Delete
            </a>
          </div>
        </div>
      </div>
      {/* Your card content */}


      {/* Update Teacher Modal */}
      <div
        className="modal fade"
        id={`updateteacher-${props.teacher.id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`staticBackdropLabel-${props.teacher.id}`}
        aria-hidden="true"
      >
        {/* Modal Content */}
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`staticBackdropLabel-${props.teacher.id}`}>
                Update Teacher Record
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateSubmit}>
                {/* Your form inputs */}
                <div className="mb-3">
                  <label htmlFor={`name-${props.teacher.id}`} className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`name-${props.teacher.id}`}
                    name="name"
                    value={updateFormData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor={`age-${props.teacher.id}`} className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id={`age-${props.teacher.id}`}
                    name="age"
                    value={updateFormData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor={`dob-${props.teacher.id}`} className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id={`dob-${props.teacher.id}`}
                    name="dob"
                    value={updateFormData.dob}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor={`classes-${props.teacher.id}`} className="form-label">
                    No. of Classes
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id={`classes-${props.teacher.id}`}
                    name="classes"
                    value={updateFormData.classes}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
