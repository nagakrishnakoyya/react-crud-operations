import React, { useState, useContext } from 'react';
// import axios from 'axios';
import { apiBaseUrl } from '../../constant.config';
import { modalsShowHideContext } from '../../App';

function EditUser(props) {
  const {userDetails, getUsersData} = props;
  const postModifiedDateConverter = (dateValue) => {
    let d = new Date(dateValue);
    let yy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let midifiedDate = `${dd}-${mm}-${yy}`;
    return midifiedDate;
  }

  const [formFields, setFormFields] = useState({
    name: userDetails.name,
    email: userDetails.email,
    midifiedDate: postModifiedDateConverter(Date.now())
  })


  const modalShowHide = useContext(modalsShowHideContext);

  const userChangeHandler = (event) => {
    let user = { ...formFields };
    user[event.target.name] = event.target.value;
    setFormFields(user);
    getUsersData();
  }

  const userUpdateHandler = () => {
    let user = { ...formFields };
    const apiEndpoint = "users";
    fetch(`${apiBaseUrl}/${apiEndpoint}/${userDetails.id}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(formFields),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    setFormFields(user);
    getUsersData();
  }

  const modalCloseHandler = () => {
    modalShowHide[1]({ editUserModal: false });
    // getUsersData();
  }

  return (
    <div>
      <div className="modal show" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Edit <span className="spl_name">User </span> Details</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={modalCloseHandler}>&times;</button>
            </div>

            <div className="modal-body">
              <div className="form-fields content_center">
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name"
                      className="form-control"
                      type="text"
                      value={formFields.name}
                      onChange={(event) => { userChangeHandler(event) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input name="email"
                      className="form-control"
                      type="text"
                      value={formFields.email}
                      onChange={(event) => { userChangeHandler(event) }} />
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-sm btn-info btn-block"
                      onClick={userUpdateHandler}>Update</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={modalCloseHandler}>Close</button>
            </div>

          </div>
        </div>
      </div>
      {/* <h2>Update <span className="spl_name">User </span> Details</h2>
      <div className="form-fields content_center">
          <div className="form">
              <div className="form-group">
                  <label htmlFor="name" className="form-label">User Name</label>
                  <input  name="name" 
                  className="form-control" 
                  type="text" 
                  value={formFields.name} 
                  onChange={(event)=>{userChangeHandler(event)}} />
              </div>
              <div className="form-group">
                  <label htmlFor="email" className="form-label">User Email</label>
                  <input  name="email" 
                  className="form-control" 
                  type="text" 
                  value={formFields.email} 
                  onChange={(event)=>{userChangeHandler(event)}} />
              </div>
              <div className="form-group">
                  <button className="btn btn-sm btn-info btn-block" onClick={userUpdateHandler}>Update</button>
              </div>
          </div>
      </div> */}
    </div>
  )
}

export default EditUser;
