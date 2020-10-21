import React, { useState, useEffect, useContext } from 'react';
import { apiBaseUrl } from '../../constant.config';
import Loader from '../Loader';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { modalsShowHideContext } from '../../App';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({});

  useEffect(() => {
    getUsersData();
  }, []);

  const modalShowHide = useContext(modalsShowHideContext);

  const getUsersData = () => {
    const apiEndpoint = "users";
    fetch(`${apiBaseUrl}/${apiEndpoint}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  const addUserModalShowHandler = () => {
    modalShowHide[1]({ addUserModal: true });
  }

  const editUserModalShowHandler = (id) => {
    let editUsers = [...users];
    let userIndex = editUsers.findIndex(user => user.id === id);
    let user = editUsers[userIndex];
    setEditUser(user);
    modalShowHide[1]({ editUserModal: true });
  }

  const userDeleteHandler = (id) => {
    // let editUsers = [...users];
    // let userIndex = editUsers.findIndex(user => user.id === id);
    const apiEndpoint = "users";
    fetch(`${apiBaseUrl}/${apiEndpoint}/${id}`, {
      method : 'DELETE'
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    getUsersData();
  }

  return (
    <div id="users" className="px-3">
      <div style={{ height: "50px" }}>
        <h2 className="float-left">List of <span className="spl_name">Users</span></h2>
        <button className="btn btn-info float-right" onClick={addUserModalShowHandler}>Add New User</button>
      </div>
      <div className="users-list">
        <div className="row">
          {
            users.length > 0 ? (
              users.map(user => {
                return (
                  <div className="col-lg-4 mb-30" key={user.id} >
                    <div className="card">
                      <div className="card-body">
                        <div className="user-text">
                          <ul className="list-unstyled">
                            <li><b>Name :</b>{user.name}</li>
                            <li><b>Email :</b>{user.email}</li>
                            <li><b>Created Date :</b>{user.userCreatedAt}</li>
                            <li><b>Last Modified Date :</b>{user.midifiedDate ? user.midifiedDate : " Not Yet Modified"}</li>
                          </ul>
                        </div>
                        <div className="user-actions">
                          <ul className="list-unstyled">
                            <li title="Edit User" onClick={() => editUserModalShowHandler(user.id)}><i className="fas fa-edit"></i></li>
                            <li title="Delete User" onClick={() => { userDeleteHandler(user.id) }}><i className="fas fa-trash-alt"></i></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) :
              (<Loader loaderText="Loading Users" />)
          }
        </div>
        {
          modalShowHide[0].addUserModal && <AddUser getUsersData={getUsersData} />
        }
        {
          modalShowHide[0].editUserModal && <EditUser  userDetails={editUser} getUsersData={getUsersData} />
        }
      </div>
    </div>
  )
}

export default UsersList;
