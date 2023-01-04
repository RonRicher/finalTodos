import { createClient } from "pexels";

const client = createClient(
  "563492ad6f9170000100000190245e70f4924268830855cbfc902fd1"
);
const query = "profile";

export const searchPexels = () => {
  let pexelPhotos = [];
  client.photos.search({ query, per_page: 10 }).then((photos) => {
    pexelPhotos = photos?.photos;
    console.log("PEXELS ", pexelPhotos);
    return pexelPhotos;
  });
};