import './Header.css';
import Logo from "../Logo/Logo";
import {Link, Route, useRouteMatch} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({isLoggedIn, onMenuClose, onMenuOpen}) {
  const match = useRouteMatch();

  return (
    <header className={`header ${match.url === '/' ? 'header_place_main' : ''} `}>
      <div className='header__container'>
        <Logo/>
        <Route exact path="/(movies|saved-movies|profile|)">
          {isLoggedIn ? (
            <>
              <Navigation modifier='header' onMenuClose={onMenuClose}/>
              <button className='header__menu-button' type='button' onClick={onMenuOpen}></button>
            </>
          ) : (
            <ul className='header__auth-links'>
              <li>
                <Link className='header__auth-link' to='/signup'>Регистрация</Link>
              </li>
              <li>
                <Link className='header__auth-link header__auth-link_type_login' to='/signin'>Войти</Link>
              </li>
            </ul>
          )}
        </Route>
      </div>
    </header>
  );
}

export default Header;
