import { Link } from "react-router-dom";
import { CityPropType } from "../Types/PropTypes";
import styles from "./CityItem.module.css";
import useCities from "./Contexts/CustomContext";
const formatDate = (date:string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
const CityItem = ({ city }: CityPropType) => {
  const {date,cityName,emoji,id,position}=city
  const {currentCity,deleteCity}=useCities()

  
  return (
    <li className="cityItem--active">
      <Link
        className={`${styles.cityItem} ${
          currentCity?.cityName == city.cityName && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={(e)=>{
          e.preventDefault()
          deleteCity(id);
        }}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
