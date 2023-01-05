import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../js/cookie";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useStateRef } from "../hooks/useStateRef";
import { searchPexels } from "../js/pexels";

function AlbumPage({ albumTitle }) {
  const { AlbumId } = useParams();
  const [album, setAlbum] = useState([]);
  const [picId, setPicId, picRef] = useStateRef((AlbumId - 1) * 50 + 1);

  const getPicture = async (counter = 8) => {
    const limit = 50 * AlbumId;

    for (let i = 0; i < counter && picRef.current <= limit; i++) {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${AlbumId}&id=${picRef.current}`
        );
        const data = await res.json();
        const pic = await data[0];

        console.log(data[0]);
        //Add 1 to the picture id counter.
        await setPicId(picRef.current + 1);
        setAlbum((prevAlbum) => [...prevAlbum, pic]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getPicture();
  }, []);

  return (
    <>
      <div className="main-content">
        <h1>{albumTitle}</h1>
        <Splide
          onDrag={() => {
            getPicture();
          }}
          onMoved={() => {
            getPicture(4);
          }}
          aria-labelledby="carousel-heading"
          options={{
            perPage: 4,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {album &&
            album.map((pic) => (
              <SplideSlide
                key={Math.random() * Number.MAX_SAFE_INTEGER}
                className="splide-item"
              >
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
