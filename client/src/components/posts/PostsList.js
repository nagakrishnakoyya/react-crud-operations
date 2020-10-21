import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axois from 'axios';
import { apiBaseUrl } from '../../constant.config';
import Loader from '../Loader';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsdata();
  }, []);

  const getPostsdata = () => {
    let apiEndpoint = "posts";
    axois.get(`${apiBaseUrl}/${apiEndpoint}`)
      .then(resp => {
        setPosts(resp.data);
        console.log(resp);
      })
      .catch(error => console.log(error))
  }

  const postDeleteHandler = (id) => {
    const postsList = [...posts];
    let postIndex = postsList.findIndex(post => post.id === id);
    let selectedPost = postsList[postIndex];
    let apiEndpoint = "posts";
    axois.delete(`${apiBaseUrl}/${apiEndpoint}/${selectedPost.id}`)
    .then(res => console.log(res))
    .catch(error => console.log(error))
    getPostsdata();
    setPosts(postsList);
    console.log(postIndex, selectedPost);
  }

  return (
    <div id="posts" className="px-3">
      <div style={{ height: "50px" }}>
        <h2 className="float-left">List of <span className="spl_name">Posts</span></h2>
        <Link to="/addpost" className="btn btn-info float-right">Add New Post</Link>
      </div>
      <div className="posts-list">
        <div className="row">
          {
            posts.length > 0 ? (
              posts.map(post => {
                return (
                  <div className="col-lg-4 mb-30" key={post.id} >
                    <div className="card">
                      <div className="card-body">
                        <div className="post-text">
                          <ul className="list-unstyled">
                            <li><b>Title :</b>{post.title}</li>
                            <li><b>Description :</b>{post.body}</li>
                            <li><b>Posted Date :</b>{(post.publishedAt)}</li>
                          </ul>
                        </div>
                        <div className="post-actions">
                          <ul className="list-unstyled">
                            <li title="Edit Post"><Link to={{ pathname: "/editpost", state: post }}><i className="fas fa-edit"></i></Link></li>
                            <li title="Delete Post" onClick={() => { postDeleteHandler(post.id) }}><i className="fas fa-trash-alt"></i></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) :
              (<Loader loaderText="Loading posts" />)
          }
        </div>
      </div>
    </div>
  )
}

export default PostsList;
