import React from 'react'
import {Link} from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="pageNotFound content_center">
      <div>
        <h1>Page not found</h1>
        <p><Link to="/">Click here to go to Home</Link></p>
      </div>
    </div>
  )
}

export default PageNotFound;