import './Portfolio.css';

function Portfolio(props) {
  const links = [

    {name: 'Статичный сайт', url: 'https://x-borz.github.io/how-to-learn/'},
    {name: 'Адаптивный сайт', url: 'https://x-borz.github.io/russian-travel/'},
    {name: 'Одностраничное приложение', url: 'https://x-borz.github.io/mesto/'},
  ];

  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <nav className='portfolio__nav'>
          <ul className='portfolio__links'>
            {links.map((link, i) =>
              <li key={i} className='portfolio__link-row'>
                <p className='portfolio__link-title'>{link.name}</p>
                <a className='portfolio__link' rel='noreferrer' href={link.url} target='_blank'>↗</a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Portfolio;
