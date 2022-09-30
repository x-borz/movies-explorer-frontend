import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation({modifier}) {
  const links = [
    {
      name: 'Фильмы',
      url: '/movies'
    },
    {
      name: 'Сохранённые фильмы',
      url: '/movies'
    },
    {
      name: '',
      url: '/profile',
      elementModifier: 'navigation__link-element_type_account',
      linkModifier: 'navigation__link_type_account'
    },
  ];

  return (
    <nav className={`navigation ${modifier ? modifier : ''}`}>
      <ul className='navigation__links'>
        {
          links.map((link, i) =>
            <li className={`navigation__link-element ${link.elementModifier ? link.elementModifier : ''}`} key={i}>
              <Link className={`navigation__link ${link.linkModifier ? link.linkModifier : ''}`} to={link.url}>
                {link.name}
              </Link>
            </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
