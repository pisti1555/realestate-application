import React from "react";
import '../loading/Loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loop cubes">
          <div className="item cubes"></div>
          <div className="item cubes"></div>
          <div className="item cubes"></div>
          <div className="item cubes"></div>
          <div className="item cubes"></div>
          <div className="item cubes"></div>
      </div>
    </div>
  );
}

export default Loading;