import { React, useState, useEffect } from 'react';
import '../css/navbar.css';
import axios from "axios";
import { UseTeacherData } from '../contexts/TeacherContext';

const Navbar = () => {

  // all teacher data state
  const [teachers, setTeachers] = UseTeacherData();

  // search query
  const [searchQuery, setSearchQuery] = useState('');

  // filters
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [classes, setClasses] = useState('');
  const [avgClasses, setAvgClasses] = useState('');

  // add new Teacher
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    classes: '',
  });

  useEffect(() => {
    //console.log("bkd: ", teachers);
  }, [teachers]);

  // function to handle add new Teacher data and updating the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //function to handle search data
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // function to add new teacher
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/teachers/add", formData);
      //console.log(response.data); 
      setTeachers([...teachers, response.data.teacher]);
      //console.log("Teachers dekho : ", response.data.teacher);

      setFormData({
        name: '',
        dob: '',
        classes: ''
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  // function to clear form fields
  const clearFields = (e) => {
    setFormData({
      name: '',
      dob: '',
      classes: ''
    });
  };

  // function to handle search query
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/teachers/search?name=${searchQuery}`);
      console.log("Search mein: ", response.data);

      setTeachers(response.data);

    } catch (error) {
      console.error('Error searching for teachers:', error);
    }
  };

  // function to get all the teachers
  const showAllTeachers = async () => {
    try {
      const response = await axios.get("/api/teachers");
      setTeachers(response.data);

      // console.log("Response data: ", response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // functions to handle filter data
  const handleMinAgeChange = (e) => {
    setMinAge(e.target.value);
  };
  const handleMaxAgeChange = (e) => {
    setMaxAge(e.target.value);
  };
  const handleNumClassesChange = (e) => {
    setClasses(e.target.value);
  };

  // function to handle filter submit
  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/teachers/filter?minAge=${minAge}&maxAge=${maxAge}&classes=${classes}`);
      console.log("Filtered teachers: ", response.data);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error filtering teachers:', error);
    }
  };

  // function to get the average classes per teacher
  const getAvgClasses = async () => {
    try {
      const response = await axios.get("/api/teachers");
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
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a className="btn btn-primary" style={{ "margin-right": "10px" }} onClick={showAllTeachers}>
            All Teachers
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse ml-2" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="btn btn-secondary" aria-current="page" data-bs-toggle="modal" data-bs-target="#addteacher">
                  Add-Teacher
                </a>
              </li>
              <li className="nav-item dropdown ml-4 mr-4">
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
                    <form onSubmit={handleFilterSubmit} className="d-flex flex-column dropdown-item">
                      {/* Age filter */}
                      <div className='dropdown-item'>
                        <label htmlFor="minAge"></label>
                        <input type="number" id="minAge" placeholder='Min Age' value={minAge} onChange={handleMinAgeChange} />
                      </div>
                      <div className='dropdown-item'>
                        <label htmlFor="maxAge"></label>
                        <input type="number" id="maxAge" placeholder='Max Age' value={maxAge} onChange={handleMaxAgeChange} />
                      </div>
                      {/* Number of classes filter */}
                      <div className='dropdown-item'>
                        <label htmlFor="classes"></label>
                        <input type="number" id="classes" placeholder='No of Classes' value={classes} onChange={handleNumClassesChange} />
                      </div>
                      <button type="submit" className='mt-2 btn btn-primary'>Apply Filters</button>
                    </form>
                  </li>
                </ul>

              </li>
              <li>
                <button type="button" onClick={getAvgClasses} class="btn btn-info" data-bs-toggle="modal" data-bs-target="#bonusModal">
                  Avg Classes
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

                {/* <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleInputChange} />
                </div> */}

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



      {/* Modal for showing Average classes per teacher */}
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
