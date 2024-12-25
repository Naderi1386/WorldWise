import React, { useEffect, useReducer } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useParams } from "../CustomParams";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCities from "./Contexts/CustomContext";
import { PositionType } from "../Types/CityTypes";
export interface newCityType {
  cityName:string;
  date:string;
  country:string;
  notes:string;
  emoji:string;
  position: PositionType;
}

const initialState = {
  cityName: "",
  country: "",
  emoji: "",
  date: String(new Date()),
  notes: "",
  isLoadingLocation: false,
  errorLoacation: "",
};

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

interface CityClickedType {
  city: string;
  locality: string;
  countryName: string;
  countryCode: string;
}
interface StateType {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  isLoadingLocation: boolean;
  errorLoacation: string;
}
interface ActionCity {
  type: "city";
  payLoad: string;
}
interface ActionCountry {
  type: "country";
  payLoad: string;
}
interface ActionEmoji {
  type: "emoji";
  payLoad: string;
}
interface ActionData {
  type: "date";
  payLoad: string;
}
interface ActionNotes {
  type: "notes";
  payLoad: string;
}
interface ActionLoading {
  type: "loading";
  payLoad: boolean;
}
interface ActionError {
  type: "error";
  payLoad: string;
}
type ActionType =
  | ActionCity
  | ActionCountry
  | ActionEmoji
  | ActionData
  | ActionNotes
  | ActionLoading
  | ActionError;
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "city":
      return { ...state, cityName: action.payLoad };
    case "country":
      return { ...state, country: action.payLoad };
    case "emoji":
      return { ...state, emoji: action.payLoad };
    case "date":
      return { ...state, date: action.payLoad };
    case "notes":
      return { ...state, notes: action.payLoad };
    case "loading":
      return { ...state, isLoadingLocation: action.payLoad };
    case "error":
      return { ...state, errorLoacation: action.payLoad };
  }
};

function FormCity() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {addCity,isLoading}=useCities()
  const {
    cityName,
    emoji,
    date,
    notes,
    isLoadingLocation,
    errorLoacation,
    country,
  } = state;

  const navigate = useNavigate();
  const { lat, lng } = useParams();
  useEffect(() => {
    const sentRequest = async () => {
      dispatch({ type: "loading", payLoad: true });
      dispatch({ type: "error", payLoad: "" });

      try {
        const request = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const response: CityClickedType = await request.json();
        if (response.city || response.countryName) {
          dispatch({
            type: "city",
            payLoad: response.city ? response.city : response.locality,
          });
          dispatch({ type: "country", payLoad: response.countryName });
          dispatch({
            type: "emoji",
            payLoad: convertToEmoji(response.countryCode),
          });
        } else {
          throw new Error(
            "That doesn not seem to be a city.Click somewhere else "
          );
        }
      } catch (error) {
        if (
          typeof error === "object" &&
          error &&
          "message" in error &&
          typeof error.message === "string"
        )
          dispatch({ type: "error", payLoad: error.message });
      } finally {
        dispatch({ type: "loading", payLoad: false });
      }
    };
    if (lat && lng) sentRequest();
  }, [lat, lng]);

  if (isLoadingLocation) return <Spinner />;

  if (!lat && !lng) return <Message message="You must click on a city" />;

  if (errorLoacation) return <Message message={errorLoacation} />;

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cityName || !date) return;
    if(lat && lng){
        const Lat=Number(lat)
        const Lng=Number(lng)
      const newCity:newCityType = {
        cityName,
        date,
        country,
        notes,
        emoji,
        position: { lat:Lat,lng:Lng },
      };
      await addCity(newCity)
      navigate('/app/cities')
    }
    
  };
  const selectedDate = new Date(date);

  return (
    <form className={`${styles.form} ${isLoading && styles.loading}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => {
            dispatch({ type: "city", payLoad: e.target.value });
          }}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => {
            dispatch({ type: "date", payLoad: e.target.value });
          }}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={(e) => {
            if (e) dispatch({ type: "date", payLoad: String(e) });
          }}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => {
            dispatch({ type: "notes", payLoad: e.target.value });
          }}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
        <Button type="back" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default FormCity;
