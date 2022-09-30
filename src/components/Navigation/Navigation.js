import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation({modifier, setIsMenuVisible}) {
  const links = [
    {
      name: 'Главная',
      url: '/',
      isHidden: modifier === 'header'
    },
    {
      name: 'Фильмы',
      url: '/movies',
      hasUnderline: modifier === 'menu'
    },
    {
      name: 'Сохранённые фильмы',
      url: '/saved-movies'
    },
    {
      name: '',
      url: '/profile',
      elementModifier: 'navigation__link-element_type_account',
      linkModifier: 'navigation__link_type_account'
    },
  ];

  return (
    <nav className={`navigation ${modifier ? 'navigation_place_' + modifier : ''}`}>
      <ul className='navigation__links'>
        {
          links.map((link, i) =>
            <li className={`navigation__link-element ${link.elementModifier ? link.elementModifier : ''} ${link.isHidden ? 'navigation__link-element_hidden' : ''}`} key={i}>
              <Link className={`navigation__link ${link.linkModifier ? link.linkModifier : ''} ${link.hasUnderline ? 'navigation__link_underlined' : ''}`} to={link.url} onClick={() => setIsMenuVisible(false)}>
                {link.name}
              </Link>
            </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
