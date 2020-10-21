import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../../constant.config';

function AddPost() {

  const postCreatedDateConverter =(dateValue) =>{
    let d = new Date(dateValue);
    let yy = d.getFullYear();
    let mm = d.getMonth()+1;
    let dd = d.getDate();
    let createdDate = `${dd}-${mm}-${yy}`;
    return createdDate;
}

  const [formFields, setFormFields] = useState({
    title : '',
    body : '',
    publishedAt : postCreatedDateConverter(Date.now())
  })

  const addPostChangeHandler =(event) =>{
    const fieldsObj = {...formFields};
    fieldsObj[event.target.name] = event.target.value;
    setFormFields(fieldsObj);
  }

  const addPostHandler =() =>{
    let objFields = {...formFields};
    const apiEndpoint = "posts";
    axios.post(`${apiBaseUrl}/${apiEndpoint}`, formFields);
    objFields.title = "";
    objFields.body = "";
    setFormFields(objFields);
    console.log(formFields);
  }

  return (
    <div className="container-fluid">
      <div style={{ height: "50px" }}>
        <h2 className="float-left">Add New <span className="spl_name">Post</span></h2>
        <Link to="/posts" className="btn btn-info float-right">Goto Posts</Link>
      </div>
      <div className="form-fields content_center">
          <div className="form">
              <div className="form-group">
                  <label htmlFor="title" className="form-label">Post Title</label>
                  <input  name="title" 
                  className="form-control" 
                  type="text" 
                  value={formFields.title} 
                  onChange={(event)=>{addPostChangeHandler(event)}} />
              </div>
              <div className="form-group">
                  <label htmlFor="body" className="form-label">Post Description</label>
                  <input  name="body" 
                  className="form-control" 
                  type="text" 
                  value={formFields.body} 
                  onChange={(event)=>{addPostChangeHandler(event)}} />
              </div>
              <div className="form-group">
                  <button className="btn btn-sm btn-info btn-block" onClick={addPostHandler}>Add Post</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default AddPost;
