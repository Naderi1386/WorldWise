import { NavLink, Outlet } from 'react-router-dom'
import styles from './Sidebar.module.css'
import Logo from '../pages/Logo'
import AppNav from '../pages/AppNav'
import Footer from './Footer'
const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <AppNav />
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default SideBar