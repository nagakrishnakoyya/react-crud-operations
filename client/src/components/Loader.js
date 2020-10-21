import React from 'react';

function Loader({loaderText}) {
  return (
    <div className="loader">
      <button className="btn btn-primary">
        <span className="spinner-border spinner-border-sm"></span>
              {loaderText}...
      </button>
    </div>
  )
}

export default Loader;
