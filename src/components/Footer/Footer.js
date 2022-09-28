import './Footer.css';

function Footer(props) {
  const links = [
    {name: 'Яндекс.Практикум', url: 'https://practicum.yandex.ru/'},
    {name: 'Github', url: 'https://github.com/x-borz/'}
  ];

  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__wrapper'>
          <p className='footer__copyright'>© {new Date().getFullYear()}</p>
          <nav className='footer__nav'>
            <ul className='footer__links'>
              {links.map((link, i) =>
                <li key={i}>
                  <a className='footer__link' target='_blank' rel='noreferrer' href={link.url}>{link.name}</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
