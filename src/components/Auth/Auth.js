import './Auth.css';
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import {useFormWithValidation} from "../Forms/Forms";
import {handleEmailInput, handleNameInput} from "../../utils/utils";
import Notification from "../Notification/Notification";
import {useContext} from "react";
import NotificationContext from "../../contexts/NotificationContext";

function Auth({isRegister, isLoading, onSubmit}) {
  const params = isRegister ?
    {
      title: 'Добро пожаловать!',
      buttonName: 'Зарегистрироваться',
      linkUrl: '/signin',
      linkName: 'Войти',
      answer: 'Уже зарегистрированы?'
    } :
    {
      title: 'Рады видеть!',
      buttonName: 'Войти',
      linkUrl: '/signup',
      linkName: 'Регистрация',
      answer: 'Ещё не зарегистрированы?'
    }

  const {values, handleChange, errors, isValid} = useFormWithValidation();

  const {closeNotification} = useContext(NotificationContext);

  const submit = evt => {
    evt.preventDefault();
    closeNotification();
    onSubmit(values);
  }

  return (
    <section className='auth page__section'>
      <Logo modifier={'auth'}/>
      <h1 className='auth__title'>{params.title}</h1>
      <form className='auth__form' onSubmit={submit}>
        {
          isRegister &&
          <>
            <label className='auth__label' htmlFor='auth-name'>Имя</label>
            <input className={`auth__input ${errors.name ? 'auth__input_errored' : ''}`} name='name' type='text' id='auth-name' required minLength='2' maxLength='30' pattern='^[a-zA-Zа-яА-ЯёЁ \-]+$' onChange={handleChange} onInput={handleNameInput} disabled={isLoading}/>
            <span className='auth__error'>{errors.name || ''}</span>
          </>
        }
        <label className='auth__label' htmlFor='auth-email'>E-mail</label>
        <input className={`auth__input ${errors.email ? 'auth__input_errored' : ''}`} name='email' type='text' id='auth-email' pattern='^[\w!#$%&’*+/=?`{|}~^-]+(?:\.[\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$' required onChange={handleChange} onInput={handleEmailInput} disabled={isLoading}/>
        <span className='auth__error'>{errors.email || ''}</span>

        <label className='auth__label' htmlFor='auth-password'>Пароль</label>
        <input className={`auth__input ${errors.password ? 'auth__input_errored' : ''}`} name='password' type='password' id='auth-password' required onChange={handleChange} disabled={isLoading}/>
        <span className='auth__error'>{errors.password || ''}</span>

        <button className={`auth__submit-btn ${!isRegister ? 'auth__submit-btn_place_login' : ''} ${!isValid || isLoading ? 'auth__submit-btn_disabled' : ''}`} type='submit' disabled={!isValid || isLoading}>
          {isLoading ? 'Загрузка...' : params.buttonName}
        </button>

        <Notification modifier='auth'/>
      </form>
      <div className='auth__wrapper'>
        <p className='auth__answer'>{params.answer}</p>
        <Link className="auth__link" to={params.linkUrl}>{params.linkName}</Link>
      </div>
    </section>
  );
}

export default Auth;
