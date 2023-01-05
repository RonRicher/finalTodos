import React from "react";
import { useNavigate } from "react-router-dom";

const Album = ({ albumTitle }) => {


  return (
    <div className="Album">
      <h2>{albumTitle}</h2>
    </div>
  );
};

export default Album;
