import './Profile.css';
import {Link} from "react-router-dom";

function Profile(props) {
  const name = 'Ренат';  //на следующем этапе буду брать из контекста
  const email = 'x-borz@yandex.ru';  //на следующем этапе буду брать из контекста

  return (
    <section className='profile page__section'>
      <h1 className='profile__greeting'>Привет, {name}!</h1>
      <ul className='profile__attributes'>
        <li className='profile__attribute'>
          <h2 className='profile__attr'>Имя</h2>
          <p className='profile__attr'>{name}</p>
        </li>
        <li className='profile__attribute'>
          <h2 className='profile__attr'>E-mail</h2>
          <p className='profile__attr'>{email}</p>
        </li>
      </ul>
      <button className='profile__edit-btn' type='button'>Редактировать</button>
      <Link className='profile__link' to='/'>Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;
