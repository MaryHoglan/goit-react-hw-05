import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={css.navbar}>
      <NavLink 
        to="/" 
        end
        className={({ isActive }) =>
          isActive ? `${css.navLink} ${css.active}` : css.navLink
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/movies" 
        className={({ isActive }) =>
          isActive ? `${css.navLink} ${css.active}` : css.navLink
        }
      >
        Movies
      </NavLink>
    </nav>
  );
}
