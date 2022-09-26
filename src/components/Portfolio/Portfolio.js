import './Portfolio.css';

function Portfolio(props) {
  const links = [
    {name: 'Статичный сайт', url: 'https://x-borz.github.io/russian-travel/'},
    {name: 'Адаптивный сайт', url: 'https://x-borz.github.io/mesto/'},
    {name: 'Одностраничное приложение', url: 'https://x-borz.github.io/react-mesto-auth/'},
  ];

  return (
    <section className='portfolio'>
      <nav className='portfolio__nav'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__links'>
          {links.map((link, i) =>
            <li key={i} className='portfolio__link-row'>
              <p className='portfolio__link-title'>{link.name}</p>
              <a className='portfolio__link' href={link.url} target='_blank'>↗</a>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
