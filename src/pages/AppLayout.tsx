import styles from "./AppLayout.module.css";

import SideBar from "../components/SideBar";
import Map from "../components/Map";
import { useAuth } from "../components/Contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AppLayout = () => {
  const {isAuthenticated}=useAuth()
  const navigate=useNavigate()
  useEffect(()=>{
    if(!isAuthenticated) navigate('/')
  },[isAuthenticated,navigate])
  return (
    <div className={styles.app}>
      <SideBar />
      <Map/>
    </div>
  );
};

export default AppLayout;
