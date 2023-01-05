import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useStateRef } from "../hooks/useStateRef";

function AlbumPage({ albumTitle }) {
  const { albumId } = useParams();
  // const [album, setAlbum] = useState([]);

  const [picId, setPicId, picIdRef] = useStateRef((albumId - 1) * 50 + 1);
  const [album, setAlbum, albumRef] = useStateRef(null);

  const getPics = async (counter = 4) => {
    const limit = 50 * albumId;

    //Fetch 8 requests by default(counter argument).
    for (let i = 0; i < counter && picIdRef.current <= limit; i++) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&id=${picIdRef.current}`
        );

        //Check if the response is json type object.
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson ? await response.json() : null;

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          throw new Error(error);
        }

        const pic = await data[0];

        console.log(data[0]);
        //Increment the picture id counter by 1.
        await setPicId(picIdRef.current + 1);
        console.log("albumRef.current ", albumRef.current);
        setAlbum(pic);
      } catch (e) {
        console.log("There was an error! ", e);
      }
    }
  };

  useEffect(() => {
    getPics();

    //Retrieve album from local storage.
    const lsAlbum = JSON.parse(localStorage.getItem("album" + albumId));
    const pId = JSON.parse(localStorage.getItem("picId" + albumId));
    if (lsAlbum?.length && pId) {
      setAlbum(lsAlbum);
      setPicId(pId);
    }

    return () => {
      //Save album to local storage.
      localStorage.setItem("album" + albumId, JSON.stringify(albumRef.current));
      localStorage.setItem("picId" + albumId, JSON.stringify(picIdRef.current));
    };
  }, []);

  return (
    <>
      <div className="main-content">
        <h1>{albumTitle}</h1>
        <Splide
          onDrag={() => {
            getPics(4);
          }}
          onMoved={() => {
            getPics(4);
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
