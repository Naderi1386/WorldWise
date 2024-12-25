import {  NavLink } from "react-router-dom"
import styles from './PageNav.module.css'
import Logo from "../pages/Logo"

const PageNav = () => {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink to='/'>

        <Logo/>
        </NavLink>
        
        <ul>
        
          <li>
            <NavLink className={styles.navLink} to={"/product"}>
              Product
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.navLink} to={"/pricing"}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.ctaLink}  to={"/login"}>
              Log In
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default PageNav