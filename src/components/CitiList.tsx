import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import useCities from "./Contexts/CustomContext";
import Message from "./Message";
import Spinner from "./Spinner";

const CitiList = () => {
  const context=useCities()
  const {isLoading,cities}=context
  if (isLoading) return <Spinner />;
  if(cities.length<1) return <Message message="Add your first city by clicking on a city on map"/>


  

  return (
    <>
      <ul className={styles.cityList}>
        {cities.map((c) => (
          <CityItem key={c.id} city={c} />
        ))}
      </ul>
    </>
  );
};

export default CitiList;
