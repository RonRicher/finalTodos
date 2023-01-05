import React from "react";

const Album = ({ albumTitle }) => {
  return (
    <div className="album">
      <br />
      <h3>{albumTitle}</h3>
      <br />
    </div>
  );
};

export default Album;
