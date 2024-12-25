import { createContext, ReactNode, useCallback, useReducer } from "react";
import { useEffect } from "react";
import { CityType } from "../../Types/CityTypes";
import { CitySelectedType } from "../City";
import { newCityType } from "../FormCity";
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};
interface ContextType {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CitySelectedType | null;
  getCity: (id: number) => Promise<void>;
  addCity: (newcity: newCityType) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
}
interface ContextPropType {
  children: ReactNode;
}
const URL = "http://localhost:9000/cities";
interface StateType {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CitySelectedType | null;
  error: string;
}
interface ActionCity {
  type: "city";
  payLoad: CityType[];
}
interface ActionLoading {
  type: "loading";
  payLoad: boolean;
}
interface ActionSelectedCity {
  type: "selected";
  payLoad: CitySelectedType;
}
interface ActionError {
  type: "error";
  payLoad: string;
}
type ActionType = ActionCity | ActionLoading | ActionSelectedCity | ActionError;
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "city":
      return { ...state, cities: action.payLoad, isLoading: false };
    case "loading":
      return { ...state, isLoading: action.payLoad };
    case "selected":
      return { ...state, currentCity: action.payLoad, isLoading: false };
    case "error":
      return { ...state, error: action.payLoad, isLoading: false };
    default:
      return state;
  }
};

export const ContextCity = createContext<ContextType | null>(null);
const Context = ({ children }: ContextPropType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, currentCity, cities } = state;
  

  useEffect(() => {
    // setIsLoading(true);
    dispatch({ type: "loading", payLoad: true });
    const controler = new AbortController();
    const sentRequest = async () => {
      try {
        const request = await fetch(`${URL}`, {
          signal: controler.signal,
        });
        const response = await request.json();
        // setCity(response);
        dispatch({ type: "city", payLoad: response });
      } catch (error) {
        alert("There was an error fetching cities....");
        throw new Error(String(error));
      }
    };
    sentRequest();
  }, []);
  const getCity = useCallback(
    async (id: number) => {
      if (String(id) != currentCity?.id) {
        try {
          dispatch({ type: "loading", payLoad: true });
          const request = await fetch(`${URL}/${id}`);
          const response = await request.json();
          dispatch({ type: "selected", payLoad: response });
        } catch (error) {
          dispatch({
            type: "error",
            payLoad: "There was an error fetching city....",
          });
        }
      }
    },
    [currentCity?.id]
  );
  const addCity = async (newcity: newCityType) => {
    try {
      dispatch({ type: "loading", payLoad: true });

      const request = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newcity),
      });
      const response = await request.json();
      dispatch({ type: "city", payLoad: [...cities, response] });
    } catch (error) {
      dispatch({
        type: "error",
        payLoad: "There was an error adding city....",
      });
    }
  };
  const deleteCity = async (id: string) => {
    try {
      fetch(`${URL}/${id}`, { method: "DELETE" });
      dispatch({ type: "city", payLoad: cities.filter((c) => c.id != id) });
    } catch (error) {
      dispatch({
        type: "error",
        payLoad: "There was an error deleting city....",
      });
    }
  };

  return (
    <ContextCity.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </ContextCity.Provider>
  );
};

export default Context;
