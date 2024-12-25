import Spinner from "./Spinner";
import Message from "./Message";
import styles from './CountryList.module.css'
import CountryItem from "./CountryItem";
import { CityType } from "../Types/CityTypes";
import { CountryType } from "../Types/CityTypes";
import useCities from "./Contexts/CustomContext";
const CountriesList = () => {
  const context=useCities()
  const {isLoading,cities}=context
  if (isLoading) return <Spinner />;
  if (cities.length < 1)
    return (
      <Message message="Add your first Country by clicking on a city on map" />
    );
 
  const uniqueCountries=new Set<string>()
  const finnalCites=cities.reduce((arr:Array<CountryType>,value:CityType)=>{
    if(!uniqueCountries.has(value.country)){
      uniqueCountries.add(value.country)
      return [...arr,{country:value.country,emoji:value.emoji}]
    }
    return arr

  },[] as CountryType[])

   
    
    

  return (
    <>
    <ul className={styles.countryList}>
       
        { finnalCites.map((c,i)=><CountryItem key={i+1} country={c}/>)}
    </ul>
     
    </>
  );
};

export default CountriesList
