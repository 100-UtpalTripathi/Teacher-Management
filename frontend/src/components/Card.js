import React from 'react';

const Card = () => {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src="https://i.pinimg.com/originals/77/85/c9/7785c9f4e2ccade7d9c743ef949cc81a.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Albatross</h5>
          <p className="card-text">Age : 44</p>
          <p className="card-text">DOB : 05/01/2005</p>
          <p className="card-text">No. of Classes : 2</p>
          <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateteacher" >Update</a>
          <a href="#" className="btn btn-primary">Delete</a>
        </div>
      </div>

      <div className="modal fade" id="updateteacher" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                  <button type="submit" className="btn btn-success">Update</button>
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