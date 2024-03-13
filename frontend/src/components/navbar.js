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
                <a className="nav-link active" aria-current="page" href="#">
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
                        <input type="number" id="min" placeholder = "Min" />
                      </div>
                      <div>
                        <label for="max"></label>
                        <input type="number" id="max" placeholder = "Max" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      No. of Classes:
                      <label for="classes"></label>
                      <input type="number" id="classes" placeholder = "classes" />
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
    </div>
  );
};

export default Navbar;
