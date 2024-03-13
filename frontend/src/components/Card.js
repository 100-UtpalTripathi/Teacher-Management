import React from 'react';

const Card = () =>
{
  return (
    <>
      <div className="card" style={{width: "18rem"}}>
        <img src="https://i.pinimg.com/originals/77/85/c9/7785c9f4e2ccade7d9c743ef949cc81a.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Albatross</h5>
          <p className="card-text">Age : 44</p>
          <p className="card-text">DOB : 05/01/2005</p>
          <p className="card-text">No. of Classes : 2</p>
          <a href="#" className="btn btn-primary">Update</a>
          <a href="#" className="btn btn-primary">Delete</a>
        </div>
      </div>
    </>
  );
};


export default Card;