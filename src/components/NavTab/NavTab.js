import './NavTab.css';

function NavTab(props) {
  const links = [
    {name: 'О проекте', url: '#about-project'},
    {name: 'Технологии', url: '#techs'},
    {name: 'Студент', url: '#about-me'}
  ];

  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__links'>
        {
          links.map((link, i) =>
            <li className='nav-tab__link-wrapper' key={i}>
              <a className='nav-tab__link' href={link.url}>{link.name}</a>
            </li>
        )}
      </ul>
    </nav>
  );
}

export default NavTab;
