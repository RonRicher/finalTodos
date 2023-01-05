import React from "react";

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
