import React from "react";
import '../error/ErrorPage.css';

const ErrorPage = ({ errors } : { errors:any }) => {
  return (
    <div className="error-page">
      <h1>{errors}</h1>
    </div>
  );
}

export default ErrorPage;