import { React, useState, useEffect } from 'react';
import '../css/navbar.css';
import axios from "axios";
import { UseTeacherData } from '../contexts/TeacherContext';

const Navbar = () => {
  const [teachers, setTeachers] = UseTeacherData();
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    classes: '',
  });

  useEffect(() => {
    // This will log the updated state when teachers changes
    //console.log("bkd: ", teachers);
  }, [teachers]); // Add teachers to the dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/teachers/add', formData);
      //console.log(response.data); // Assuming the server responds with some data
      setTeachers([...teachers, response.data.teacher]);
      //console.log("Teachers dekho : ", response.data.teacher);

      setFormData({
        name: '',
        age: '',
        dob: '',
        classes: ''
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  useEffect(() => {
    // This will log the updated state when teachers changes
    //console.log("bkd: ", teachers);
  }); // Add teachers to the dependency array
  useEffect(() => {
    // This will log the updated state when teachers changes
    //console.log("bkd: ", teachers);
  }, [teachers]); // Add teachers to the dependency array


  const clearFields = (e) => {
    setFormData({
      name: '',
      age: '',
      dob: '',
      classes: ''
    });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/api/teachers/search?name=${searchQuery}`);
      console.log("Search mein: ", response.data);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error searching for teachers:', error);
    }
  };

  const showAllTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(response.data);

      // console.log("Response data: ", response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="btn btn-success" onClick={showAllTeachers}>
            All Teachers
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" data-bs-toggle="modal" data-bs-target="#addteacher">
                  Add-Teacher
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter
                </a>
                <div>
                  <ul className="dropdown-menu">
                    <li>

                      Age
                      <div className="age-container">
                        <div>
                          <label htmlFor="min"></label>
                          <input type="number" id="min" placeholder="Min" />
                        </div>
                        <div>
                          <label htmlFor="max"></label>
                          <input type="number" id="max" placeholder="Max" />
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        No. of Classes:
                        <label htmlFor="classes"></label>
                        <input type="number" id="classes" placeholder="classes" />
                      </div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button type="button" className="btn btn-success btn-sn">Apply</button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <form onSubmit={handleSearchSubmit} className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>


      {/* Modal Trigger */}
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addteacher">
  Launch static backdrop modal
</button> */}


      {/* Modal */}
      <div className="modal fade" id="addteacher" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Add New Teacher</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="classes" className="form-label">No. of Classes</label>
                  <input type="number" className="form-control" id="classes" name="classes" value={formData.classes} onChange={handleInputChange} />
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={clearFields}>Cancel</button>
                  <button type="submit" className="btn btn-success " data-bs-dismiss="modal">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
