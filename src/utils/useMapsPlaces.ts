/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { PlacesResponse } from "../types/places";
import useCallApi from "./useCallApi";

const KEY = import.meta.env.VITE_PLACES_API_KEY as string;
const BASE_URL = `places/api/place/findplacefromtext/json`;

function createUrl(placeName: string) {
  const query = new URLSearchParams();
  const responseFields = ["name", "photo", "formatted_address", "place_id"];

  query.append("input", placeName);
  query.append("inputtype", "textquery")
  query.append("key", KEY);
  query.append("fields", responseFields.join(","));
  const url = BASE_URL + "?" + query.toString();
  return url;
}

function createOptions(placeName: string) {
  return {
    url: createUrl(placeName),
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
}

const useMapsPlaces = (placeName: string) => {
  const [imageReference, setImageReference] = useState("");
  const { data, hasError, setError, isLoading, setLoading, send, clear } =
    useCallApi<PlacesResponse>();

  useEffect(() => {
    send(createOptions(placeName));
  }, [placeName]);

  useEffect(() => {
    if (data) {
      try {
        const { candidates } = data;
        const imageReference = candidates[0].photos[0].photo_reference;
        setImageReference(imageReference);
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
    imageReference,
  };
};

export default useMapsPlaces;
