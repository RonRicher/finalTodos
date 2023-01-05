import React from "react";
import { useNavigate } from "react-router-dom";

const Album = ({ albumTitle }) => {


  return (
    <div className="Album">
      <br />
      <h3 className='albumLink'>{albumTitle}</h3>
      <br />
    </div>
  );
};

export default Album;
