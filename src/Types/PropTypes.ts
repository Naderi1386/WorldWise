import { CityType, CountryType } from "./CityTypes";

export interface CityListPropType{
    cities:Array<CityType>
    isLoading:boolean
}
export interface CityPropType {
  city: CityType;
}
export interface CountriesListPropType{
  cities:Array<CityType>
  isLoading:boolean

}
export interface CountryItemPropType{
  country:CountryType
}