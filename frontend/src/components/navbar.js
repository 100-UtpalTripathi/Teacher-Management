import React from 'react';
import '../css/navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            TMA
          </a>
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
                <a className="nav-link active" aria-current="page" href="#" data-bs-toggle="modal" data-bs-target="#addteacher">
                  Add-Teacher
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
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
                          <label for="min"></label>
                          <input type="number" id="min" placeholder="Min" />
                        </div>
                        <div>
                          <label for="max"></label>
                          <input type="number" id="max" placeholder="Max" />
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        No. of Classes:
                        <label for="classes"></label>
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
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
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="teacherName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="teacherName" required />

                </div>
                <div className="mb-3">
                  <label for="age" className="form-label">Age</label>
                  <input type="number" className="form-control" id="age" />
                </div>

                <div className="mb-3">
                  <label for="dob" className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" id="dob" />
                </div>
                <div className="mb-3">
                  <label for="noofclasses" className="form-label">No. of Classes</label>
                  <input type="number" className="form-control" id="noofclasses" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-success">Add</button>
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
