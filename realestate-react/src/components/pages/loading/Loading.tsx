import React from "react";
import loading_page from './Loading.module.css';

const Loading = () => {
  return (
    <div className={loading_page.loading}>
      <div className={loading_page.loop + ' ' + loading_page.cubes}>
        <div className={loading_page.item + ' ' + loading_page.cubes}></div>
        <div className={loading_page.item + ' ' + loading_page.cubes}></div>
        <div className={loading_page.item + ' ' + loading_page.cubes}></div>
        <div className={loading_page.item + ' ' + loading_page.cubes}></div>
        <div className={loading_page.item + ' ' + loading_page.cubes}></div>
        <div className={loading_page.item + ' ' + loading_page.cubes}></div>
      </div>
    </div>
  );
}

export default Loading;