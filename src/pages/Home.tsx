import { useAuth } from '../components/Contexts/useAuth';
import PageNav from '../components/PageNav';
import styles from './Homepage.module.css'
import { NavLink } from 'react-router-dom';
function Home() {
  const {isAuthenticated}=useAuth()
  return (
    <main className={styles.homepage}>
        <PageNav/>
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <NavLink to={`${isAuthenticated ? '/app' : '/login'}`} className='cta'>Start tracking now</NavLink>
      </section>
    </main>
  );
}

export default Home