/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useCallApi from "./useCallApi";

const KEY = import.meta.env.VITE_PLACES_API_KEY as string;
const BASE_URL = `places/api/place/photo`;

function createUrl(imageReference: string) {
  const query = new URLSearchParams();
  query.append("maxwidth", "400");
  query.append("photo_reference", imageReference);
  query.append("key", KEY);
  const url = BASE_URL + "?" + query.toString();

  return url;
}

function createOptions(imageReference: string) {
  return {
    url: createUrl(imageReference),
    method: "GET",
  };
}

const usePlacesImage = (imageReference: string) => {
  const [imageSrc, setImageSrc] = useState("");
  const { data, hasError, setError, isLoading, setLoading, send, clear } =
    useCallApi<Blob>(true);

  useEffect(() => {
    if (imageReference) send(createOptions(imageReference));
  }, [imageReference]);

  useEffect(() => {
    if (data) {
      try {
        setImageSrc(URL.createObjectURL(data));
      } catch (e) {
        setError(true);
        setLoading(false);
      }

      clear();
    }
  }, [clear, data, setError, setLoading]);

  return {
    isLoading,
    hasError,
    imageSrc,
  };
};

export default usePlacesImage;
