import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../js/cookie";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function AlbumPage({ albumTitle }) {
  const [album, setAlbum] = useState(null);
  const userId = getCookie("userId");
  const { id } = useParams();

  const getAlbum = async () => {
    console.log("album id: ", id);
    console.log("Album: ", album);

    if (!album) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
      );
      const data = await res.json();
      setAlbum(data);
      console.log("getAlbum() ", data);

      return data;
    }
  };

  useEffect(() => {
    getAlbum();
  }, []);

  return (
    <>
      <div className="main-content">
        <h1>{albumTitle}</h1>
        <Splide
          aria-labelledby="carousel-heading"
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {album &&
            album.map((pic) => (
              <SplideSlide className="splide-item">
                <img
                  key={Math.random()}
                  className="album-pic"
                  src={pic.thumbnailUrl}
                  alt=""
                />
                <p>{pic.title}</p>
              </SplideSlide>
            ))}
        </Splide>
      </div>
    </>
  );
}

export default AlbumPage;
