import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound(props) {
  return (
    <section className='not-found'>
      <h1 className='not-found__error-code'>404</h1>
      <p className='not-found__error-message'>Страница не найдена</p>
      <Link className="not-found__link" to="/">Назад</Link>
    </section>
  );
}

export default NotFound;
