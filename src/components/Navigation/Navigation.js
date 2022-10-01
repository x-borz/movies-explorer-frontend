import './Navigation.css';
import {NavLink} from "react-router-dom";

function Navigation({modifier, onMenuClose}) {
  const links = [
    {
      name: 'Главная',
      url: '/',
      isHidden: modifier === 'header',
      hasActiveState: modifier === 'menu'
    },
    {
      name: 'Фильмы',
      url: '/movies',
      hasActiveState: modifier === 'menu'
    },
    {
      name: 'Сохранённые фильмы',
      url: '/saved-movies',
      hasActiveState: modifier === 'menu'
    },
    {
      name: '',
      url: '/profile',
      elementModifier: 'navigation__link-element_type_account',
      linkModifier: 'navigation__link_type_account',
      hasActiveState: false
    }
  ];

  return (
    <nav className={`navigation ${modifier ? 'navigation_place_' + modifier : ''}`}>
      <ul className='navigation__links'>
        {
          links.map((link, i) =>
            <li className={`navigation__link-element ${link.elementModifier ? link.elementModifier : ''} ${link.isHidden ? 'navigation__link-element_hidden' : ''}`} key={i}>
              <NavLink className={`navigation__link ${link.linkModifier ? link.linkModifier : ''}`} activeClassName={link.hasActiveState ? `navigation__link_active` : ''} to={link.url} exact onClick={onMenuClose}>
                {link.name}
              </NavLink>
            </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
