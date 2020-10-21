import React, { useState, useContext } from 'react';
// import axios from 'axios';
import { apiBaseUrl } from '../../constant.config';
import { modalsShowHideContext } from '../../App';

function AddUser(props) {

  const postCreatedDateConverter = (dateValue) => {
    let d = new Date(dateValue);
    let yy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let createdDate = `${dd}-${mm}-${yy}`;
    return createdDate;
  }

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    userCreatedAt: postCreatedDateConverter(Date.now())
  })


  const modalShowHide = useContext(modalsShowHideContext);

  const userChangeHandler = (event) => {
    let user = { ...formFields };
    user[event.target.name] = event.target.value;
    setFormFields(user);
  }

  const addUserHandler = () => {
    let user = { ...formFields };
    const apiEndpoint = "users";
    fetch(`${apiBaseUrl}/${apiEndpoint}`, {
      method: 'POST',
      body: JSON.stringify(formFields),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    user.name = "";
    user.email = "";
    setFormFields(user);
    props.getUsersData();
    console.log("getTodosData();")
  }

  const modalCloseHandler = () => {
    modalShowHide[1]({ editUserModal: false });
  }


  return (
    <div>
      <div className="modal show" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Add New <span className="spl_name">User </span></h4>
              <button type="button" className="close" data-dismiss="modal" onClick={modalCloseHandler}>&times;</button>
            </div>

            <div className="modal-body">
              <div className="form-fields content_center">
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input name="name"
                      className="form-control"
                      type="text"
                      value={formFields.name}
                      onChange={(event) => { userChangeHandler(event) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">User Email</label>
                    <input name="email"
                      className="form-control"
                      type="text"
                      value={formFields.email}
                      onChange={(event) => { userChangeHandler(event) }} />
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-sm btn-info btn-block"
                      onClick={addUserHandler}>Add User</button>
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
    </div>
  )
}

export default AddUser;
