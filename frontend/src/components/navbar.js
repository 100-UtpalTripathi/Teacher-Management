import { React, useState, useEffect } from 'react';
import '../css/navbar.css';
import axios from "axios";
import { UseTeacherData } from '../contexts/TeacherContext';

const Navbar = () => {
  const [teachers, setTeachers] = UseTeacherData();
  const [searchQuery, setSearchQuery] = useState('');

  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [classes, setClasses] = useState('');
  const [avgClasses, setAvgClasses] = useState('');

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
  };

  const handleMinAgeChange = (e) => {
    setMinAge(e.target.value);
  };
  const handleMaxAgeChange = (e) => {
    setMaxAge(e.target.value);
  };
  const handleNumClassesChange = (e) => {
    setClasses(e.target.value);
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/api/teachers/filter?minAge=${minAge}&maxAge=${maxAge}&classes=${classes}`);
      console.log("Filtered teachers: ", response.data);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error filtering teachers:', error);
    }
  };

  const getAvgClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      const Teachers = response.data;

      const totalClasses = Teachers.reduce((acc, teacher) => acc + parseInt(teacher.classes), 0);
      console.log("totalClass", totalClasses);
      // console.log("accClass", totalClasses);

      // Calculate the average
      let curAvgClasses = (totalClasses / Teachers.length).toFixed(2);

      setAvgClasses(curAvgClasses);

      // console.log("Response data: ", response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="btn btn-success" onClick={showAllTeachers}>
            All Teachers
          </button>

          <div className="collapse navbar-collapse ml-2" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="btn btn-primary" aria-current="page" data-bs-toggle="modal" data-bs-target="#addteacher">
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
                <ul className='dropdown-menu'>
                  <li>
                    <form onSubmit={handleFilterSubmit} className="d-flex dropdown-item">
                      {/* Age filter */}
                      <div className='dropdown-item'>
                        <label htmlFor="minAge">Min Age:</label>
                        <input type="number" id="minAge" value={minAge} onChange={handleMinAgeChange} />
                      </div>
                      <div className='dropdown-item'>
                        <label htmlFor="maxAge">Max Age:</label>
                        <input type="number" id="maxAge" value={maxAge} onChange={handleMaxAgeChange} />
                      </div>
                      {/* Number of classes filter */}
                      <div className='dropdown-item'>
                        <label htmlFor="classes">Number of Classes:</label>
                        <input type="number" id="classes" value={classes} onChange={handleNumClassesChange} />
                      </div>
                      <button type="submit">Apply Filters</button>
                    </form>
                  </li>
                </ul>

              </li>
              <li>
                <button type="button" onClick={getAvgClasses} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bonusModal">
                  Bonus
                </button>
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
                required
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



      {/* Modal for bonus */}
      <div class="modal fade" id="bonusModal" tabindex="-1" aria-labelledby="bonusModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="bonusModalLabel">Additional Info</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              (Average classes per Teacher : {avgClasses})
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
