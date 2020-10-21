import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../../constant.config';

function EditPost(props) {
  let postData = props.location.state;
  let goToBack = props.history.goBack;
  const [formFields, updateFormFields] = useState({ ...postData });

  const addPostChangeHandler = (event) => {
    const fieldsObj = { ...formFields };
    fieldsObj[event.target.name] = event.target.value;
    updateFormFields(fieldsObj);
  }

  const updatePostHandler = () => {
    let dateRegex = /^[0-3]?[0-9]-[0-3]?[0-9]-(?:[0-9]{2})?[0-9]{2}$/g
    const apiEndpoint = "posts";
    if (dateRegex.test(formFields.publishedAt)) {
      axios.put(`${apiBaseUrl}/${apiEndpoint}/${postData.id}`, formFields);
    } else {
      alert("Date field not support string");
    }
    goToBack();
  }

  return (
    <div className="container-fluid">
      <h2 className="text-center pb-5 mb-0">Edit <span className="spl_name">Post</span></h2>
      <div className="form-fields content_center_100">
        <div className="form">
          <div className="form-group">
            <label htmlFor="post-title" className="form-label">Post Title</label>
            <input name="title" className="form-control" type="text" value={formFields.title} onChange={addPostChangeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="post-title" className="form-label">Post Description</label>
            <input name="body" className="form-control" type="text" value={formFields.body} onChange={addPostChangeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="post-title" className="form-label">Post Created Date</label>
            <input name="publishedAt" className="form-control" type="text" value={formFields.publishedAt} onChange={addPostChangeHandler} />
          </div>
          <div className="form-group">
            <button className="btn btn-sm btn-info btn-block" onClick={updatePostHandler}>Update Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost;
