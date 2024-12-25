import { useState } from "react";

interface PositionType {
  lat: number;
  lng: number;
}
export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [Position, setPosition] = useState<PositionType | null>(null);
  const [error, setError] = useState<string | null>(null);
  

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        if (
          typeof error === "object" &&
          error &&
          "message" in error &&
          typeof error.message === "string"
        ){

            setError(error.message);
        }
        setIsLoading(false);
      }
    );
  }

  return { isLoading, Position, error, getPosition };
}