import { CountryItemPropType } from "../Types/PropTypes";
import styles from "./CountryItem.module.css";

function CountryItem({ country }:CountryItemPropType) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
