export interface PositionType {
  lat: number;
  lng: number;
}
export interface CityType {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: PositionType;
  id: string;
}
export interface CountryType{
  id:string
  emoji:string
  country:string
}
