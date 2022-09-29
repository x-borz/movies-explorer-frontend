import './NotFound.css';

function NotFound(props) {
  return (
    <section className='not-found'>
      <h1 className='not-found__error-code'>404</h1>
      <p className='not-found__error-message'>Страница не найдена</p>
      <a className='not-found__link' href='#'>Назад</a>
    </section>
  );
}

export default NotFound;
